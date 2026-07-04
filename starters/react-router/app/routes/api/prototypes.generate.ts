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
  });

  const response = result.toTextStreamResponse();

  if (!response.body) {
    return response;
  }

  const [clientStream, persistenceStream] = response.body.tee();

  void persistPrototypeFromStream({
    stream: persistenceStream,
    prototypeId,
    message,
    store,
  });

  return new Response(clientStream, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

async function persistPrototypeFromStream({
  stream,
  prototypeId,
  message,
  store,
}: {
  stream: ReadableStream<Uint8Array>;
  prototypeId: string;
  message: string;
  store: ReturnType<typeof getPrototypeStore>;
}) {
  try {
    const text = await readStreamText(stream);
    const compiledSpec = compileSpecFromStreamText(text);

    if (!compiledSpec) {
      console.error("[DEBUG-prototype-persist] compiled spec was null");
      return;
    }

    const persisted = await persistValidatedPrototypeVersion({
      prototypeId,
      message,
      spec: compiledSpec,
      store,
    });

    if (!persisted) {
      console.error("[DEBUG-prototype-persist] compiled spec did not persist after validation");
    }
  } catch (error) {
    console.error("[DEBUG-prototype-persist] failed to persist streamed prototype", error);
  }
}

async function readStreamText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let text = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    text += decoder.decode(value, { stream: true });
  }

  text += decoder.decode();

  return text;
}
