import type { PrototypeRecord, PrototypeStore } from "~/prototyping/store";

export async function restorePrototypeVersion({
  prototypeId,
  versionIndex,
  store,
}: {
  prototypeId: string;
  versionIndex: number;
  store: PrototypeStore;
}): Promise<PrototypeRecord> {
  const record = await store.get(prototypeId);

  if (!record) {
    throw new Response("Prototype not found", { status: 404 });
  }

  if (!Number.isInteger(versionIndex) || versionIndex < 0 || versionIndex >= record.versions.length) {
    throw new Response("Invalid version index", { status: 400 });
  }

  const version = record.versions[versionIndex];

  return store.appendVersion(prototypeId, {
    spec: version.spec,
    message: `Restore: ${version.message}`,
  });
}
