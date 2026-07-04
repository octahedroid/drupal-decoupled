import type { ActionFunctionArgs } from "react-router";

import { assertPrototypingEnabled } from "~/prototyping/config.server";
import { restorePrototypeVersion } from "~/prototyping/restore.server";
import { getPrototypeStore } from "~/prototyping/store";

export async function action({ request, params }: ActionFunctionArgs) {
  assertPrototypingEnabled();

  const prototypeId = params.id;

  if (!prototypeId) {
    throw new Response("Prototype id is required", { status: 400 });
  }

  const formData = await request.formData();
  const versionIndexValue = formData.get("versionIndex");
  const versionIndex = Number(versionIndexValue);

  const restored = await restorePrototypeVersion({
    prototypeId,
    versionIndex,
    store: getPrototypeStore(),
  });

  return {
    ok: true,
    restoredVersionIndex: versionIndex,
    versionCount: restored.versions.length,
  };
}
