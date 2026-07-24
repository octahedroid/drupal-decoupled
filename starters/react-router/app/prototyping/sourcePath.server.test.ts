import { describe, expect, it } from "vitest";

import {
  buildGoogleDocSourcePath,
  getGoogleDocId,
  isGoogleDocSourcePath,
  validatePrototypeSourcePath,
} from "~/prototyping/sourcePath.server";

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

describe("buildGoogleDocSourcePath", () => {
  it("prefixes a valid doc id", () => {
    expect(buildGoogleDocSourcePath("abc123_-XYZ")).toBe("gdoc:abc123_-XYZ");
  });

  it("rejects a missing or invalid doc id", () => {
    expect(() => buildGoogleDocSourcePath(undefined)).toThrow(Response);
    expect(() => buildGoogleDocSourcePath("has a space")).toThrow(Response);
    expect(() => buildGoogleDocSourcePath("")).toThrow(Response);
  });
});

describe("isGoogleDocSourcePath / getGoogleDocId", () => {
  it("identifies synthetic google doc source paths and extracts the id", () => {
    expect(isGoogleDocSourcePath("gdoc:abc123")).toBe(true);
    expect(isGoogleDocSourcePath("/about")).toBe(false);
    expect(getGoogleDocId("gdoc:abc123")).toBe("abc123");
    expect(getGoogleDocId("/about")).toBeNull();
  });
});
