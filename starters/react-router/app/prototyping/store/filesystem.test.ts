import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { FilesystemPrototypeStore } from "~/prototyping/store/filesystem";

const VALID_SPEC = {
  root: "root",
  elements: {
    root: {
      type: "NodePage",
      props: {},
      children: [],
    },
  },
};

describe("FilesystemPrototypeStore", () => {
  let tempRoot: string;
  let tick: number;

  beforeEach(async () => {
    tempRoot = join(process.cwd(), ".tmp-tests", crypto.randomUUID());
    tick = 0;
    await mkdir(tempRoot, { recursive: true });
  });

  afterEach(async () => {
    await import("node:fs/promises").then(({ rm }) =>
      rm(tempRoot, { recursive: true, force: true }),
    );
  });

  function createStore() {
    return new FilesystemPrototypeStore({
      baseDir: tempRoot,
      now: () => new Date(Date.UTC(2026, 6, 2, 12, 0, tick++)),
    });
  }

  it("creates, reads, lists, and appends versions while preserving order", async () => {
    const store = createStore();

    const created = await store.create({
      sourcePath: "/about",
      message: "Move CTA above hero",
    });

    expect(created.sourcePath).toBe("/about");
    expect(created.pendingMessage).toBe("Move CTA above hero");
    expect(created.versions).toEqual([]);

    const roundTripped = await store.get(created.id);
    expect(roundTripped).toEqual(created);

    const firstAppend = await store.appendVersion(created.id, {
      spec: VALID_SPEC,
      message: "Move CTA above hero",
    });

    expect(firstAppend.pendingMessage).toBeUndefined();
    expect(firstAppend.versions).toHaveLength(1);
    expect(firstAppend.versions[0]?.message).toBe("Move CTA above hero");

    const secondAppend = await store.appendVersion(created.id, {
      spec: VALID_SPEC,
      message: "Add pricing section",
    });

    expect(secondAppend.versions).toHaveLength(2);
    expect(secondAppend.versions.map((version) => version.message)).toEqual([
      "Move CTA above hero",
      "Add pricing section",
    ]);
    expect(secondAppend.versions[0]?.timestamp).not.toBe(
      secondAppend.versions[1]?.timestamp,
    );

    const listed = await store.list();
    expect(listed).toHaveLength(1);
    expect(listed[0]).toEqual(secondAppend);
  });

  it("returns null for unknown ids", async () => {
    const store = createStore();

    const result = await store.get("11111111-1111-4111-8111-111111111111");

    expect(result).toBeNull();
  });

  it("throws a descriptive error when appending to an unknown id", async () => {
    const store = createStore();

    await expect(
      store.appendVersion("11111111-1111-4111-8111-111111111111", {
        spec: VALID_SPEC,
        message: "Nope",
      }),
    ).rejects.toThrow("Prototype not found");
  });

  it("rejects invalid ids before touching the filesystem", async () => {
    const store = createStore();

    await expect(store.get("../../x")).rejects.toThrow("Invalid prototype id");
  });

  it("surfaces a descriptive error for corrupt JSON files", async () => {
    const store = createStore();
    const id = "11111111-1111-4111-8111-111111111111";
    const filePath = join(tempRoot, `${id}.json`);

    await writeFile(filePath, "{ definitely-not-json", "utf8");

    await expect(store.get(id)).rejects.toThrow(
      `Prototype record ${id} contains invalid JSON`,
    );
  });

  it("writes one JSON file per prototype record", async () => {
    const store = createStore();
    const created = await store.create({ sourcePath: "/home" });

    const file = await readFile(join(tempRoot, `${created.id}.json`), "utf8");

    expect(JSON.parse(file)).toMatchObject({
      id: created.id,
      sourcePath: "/home",
      versions: [],
    });
  });
});
