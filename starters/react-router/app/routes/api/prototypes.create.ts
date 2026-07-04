import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";

import { isPrototypingEnabled } from "~/prototyping/config.server";
import { validatePrototypeSourcePath } from "~/prototyping/sourcePath.server";
import { getPrototypeStore } from "~/prototyping/store";

export async function action({ request }: ActionFunctionArgs) {
  if (!isPrototypingEnabled()) {
    throw new Response("Prototyping is disabled", { status: 403 });
  }

  const formData = await request.formData();
  const sourcePath = validatePrototypeSourcePath(formData.get("sourcePath"));
  const message = formData.get("message");

  if (typeof message !== "string" || !message.trim()) {
    throw new Response("A non-empty prompt is required", { status: 400 });
  }

  const store = getPrototypeStore();
  const prototype = await store.create({
    sourcePath,
    message: message.trim(),
  });

  return redirect(`/prototypes/${prototype.id}`);
}
