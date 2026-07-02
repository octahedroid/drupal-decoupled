import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import type { ActionFunctionArgs } from "react-router";

import { assertPrototypingGenerationEnabled } from "~/prototyping/config.server";
import {
  compileSpecFromStreamText,
  DEFAULT_PROTOTYPING_MODEL,
  extractGenerationMessage,
  getPrototypeHistoryMessages,
  persistValidatedPrototypeVersion,
  resolvePrototypeBaseSpec,
} from "~/prototyping/generate.server";
import { buildPrototypeSystemPrompt } from "~/prototyping/prompt.server";
import { getPrototypeStore } from "~/prototyping/store";

export async function action({ request, params }: ActionFunctionArgs) {
  const { anthropicApiKey } = assertPrototypingGenerationEnabled();
  const prototypeId = params.id;

  if (!prototypeId) {
    throw new Response("Prototype id is required", { status: 400 });
  }

  const body = await request.json().catch(() => {
    throw new Response("Invalid JSON body", { status: 400 });
  });

  const message = extractGenerationMessage(body);
  const store = getPrototypeStore();
  const prototype = await store.get(prototypeId);

  if (!prototype) {
    throw new Response("Prototype not found", { status: 404 });
  }

  const baseSpec = await resolvePrototypeBaseSpec({ prototype });
  const system = buildPrototypeSystemPrompt({
    baseSpec,
    historyMessages: getPrototypeHistoryMessages(prototype),
  });

  const anthropic = createAnthropic({ apiKey: anthropicApiKey });
  const result = streamText({
    model: anthropic(DEFAULT_PROTOTYPING_MODEL),
    system,
    prompt: message,
    onFinish: async ({ text }) => {
      const compiledSpec = compileSpecFromStreamText(text);

      if (!compiledSpec) {
        return;
      }

      await persistValidatedPrototypeVersion({
        prototypeId,
        message,
        spec: compiledSpec,
        store,
      });
    },
  });

  return result.toTextStreamResponse();
}
