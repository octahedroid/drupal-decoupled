import { describe, expect, it } from "vitest";

import {
  assertPrototypingGenerationEnabled,
  getPrototypingConfig,
  isPrototypingEnabled,
} from "~/prototyping/config.server";

describe("prototyping config", () => {
  it("returns generation-ready config only when the feature flag and api key are present", () => {
    const config = getPrototypingConfig({
      PROTOTYPING_ENABLED: "true",
      ANTHROPIC_API_KEY: "sk-ant-123",
    });

    expect(config).toEqual({
      prototypingEnabled: true,
      anthropicApiKey: "sk-ant-123",
      canGenerate: true,
    });
  });

  it("reports the feature as disabled when the env flag is not true", () => {
    expect(isPrototypingEnabled({ PROTOTYPING_ENABLED: "false" })).toBe(false);
    expect(isPrototypingEnabled({})).toBe(false);
  });

  it("throws a 403 response when the feature flag is disabled", () => {
    expect(() => assertPrototypingGenerationEnabled({})).toThrow(Response);

    try {
      assertPrototypingGenerationEnabled({});
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(403);
    }
  });

  it("throws a 403 response when the anthropic key is missing", () => {
    try {
      assertPrototypingGenerationEnabled({ PROTOTYPING_ENABLED: "true" });
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(403);
    }
  });
});
