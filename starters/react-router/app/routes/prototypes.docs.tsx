import type { Route } from "./+types/prototypes.docs";
import { assertPrototypingEnabled } from "~/prototyping/config.server";
import {
  buildGoogleDocPrototypeMessage,
  parseGoogleDocPrototypePayload,
  stripGoogleDocComments,
} from "~/prototyping/googleDocs.server";
import { buildGoogleDocSourcePath } from "~/prototyping/sourcePath.server";
import { getPrototypeStore } from "~/prototyping/store";

export async function action({ request }: Route.ActionArgs) {
  assertPrototypingEnabled();

  const body = await request.json().catch(() => {
    throw new Response("Invalid JSON body", { status: 400 });
  });

  const { docId, title, html } = parseGoogleDocPrototypePayload(body);

  const store = getPrototypeStore();
  const prototype = await store.create({
    sourcePath: buildGoogleDocSourcePath(docId),
    label: title,
    message: buildGoogleDocPrototypeMessage({
      title,
      html: stripGoogleDocComments(html),
    }),
  });

  return { prototypeUrl: `http://localhost:8080/prototypes/${prototype.id}` };
}
