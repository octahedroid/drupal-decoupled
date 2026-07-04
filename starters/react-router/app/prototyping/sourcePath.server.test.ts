import { describe, expect, it } from "vitest";

import { validatePrototypeSourcePath } from "~/prototyping/sourcePath.server";

describe("validatePrototypeSourcePath", () => {
  it("accepts relative source paths with optional query strings", () => {
    expect(validatePrototypeSourcePath("/about")).toBe("/about");
    expect(validatePrototypeSourcePath("/node/preview?page=1")).toBe(
      "/node/preview?page=1",
    );
  });

  it("rejects absolute urls, protocol-relative urls, and traversal segments", () => {
    expect(() => validatePrototypeSourcePath("https://evil.com/boom")).toThrow(
      Response,
    );
    expect(() => validatePrototypeSourcePath("//evil.com/boom")).toThrow(
      Response,
    );
    expect(() => validatePrototypeSourcePath("/../../boom")).toThrow(Response);
  });
});
