import type { Spec } from "@json-render/core";
import { describe, expect, it, vi } from "vitest";

import { restorePrototypeVersion } from "~/prototyping/restore.server";
import type { PrototypeRecord, PrototypeStore } from "~/prototyping/store";

const SPEC = {
  root: "root",
  elements: {
    root: {
      type: "NodePage",
      props: {},
      children: [],
    },
  },
} satisfies Spec;

describe("restorePrototypeVersion", () => {
  it("appends a restored copy of the selected version", async () => {
    const store = createStoreStub({
      record: createRecord(),
    });

    await restorePrototypeVersion({
      prototypeId: "proto-1",
      versionIndex: 0,
      store,
    });

    expect(store.appendVersion).toHaveBeenCalledWith("proto-1", {
      spec: SPEC,
      message: "Restore: First version",
    });
  });

  it("rejects invalid indices", async () => {
    const store = createStoreStub({
      record: createRecord(),
    });

    await expect(
      restorePrototypeVersion({ prototypeId: "proto-1", versionIndex: 99, store }),
    ).rejects.toThrow(Response);
  });
});

function createRecord(): PrototypeRecord {
  return {
    id: "proto-1",
    sourcePath: "/about",
    createdAt: "2026-07-02T00:00:00.000Z",
    versions: [
      {
        spec: SPEC,
        message: "First version",
        timestamp: "2026-07-02T00:00:00.000Z",
      },
    ],
  };
}

function createStoreStub({ record }: { record: PrototypeRecord | null }): PrototypeStore {
  return {
    create: vi.fn(),
    get: vi.fn(async () => record),
    list: vi.fn(),
    appendVersion: vi.fn(async () => record as PrototypeRecord),
  };
}
