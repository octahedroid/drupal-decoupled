import { describe, expect, it } from "vitest";

import {
  buildGoogleDocPrototypeMessage,
  parseGoogleDocPrototypePayload,
  stripGoogleDocComments,
} from "~/prototyping/googleDocs.server";

describe("parseGoogleDocPrototypePayload", () => {
  it("accepts a valid payload and trims fields", () => {
    expect(
      parseGoogleDocPrototypePayload({
        docId: " abc123 ",
        title: " Home Page ",
        html: " <p>Hi</p> ",
      }),
    ).toEqual({
      docId: "abc123",
      title: "Home Page",
      html: "<p>Hi</p>",
    });
  });

  it("defaults a missing title", () => {
    expect(
      parseGoogleDocPrototypePayload({
        docId: "abc123",
        html: "<p>Hi</p>",
      }).title,
    ).toBe("Untitled Google Doc");
  });

  it("rejects a missing docId", () => {
    expect(() =>
      parseGoogleDocPrototypePayload({ html: "<p>Hi</p>" }),
    ).toThrow(Response);
  });

  it("rejects a missing html", () => {
    expect(() =>
      parseGoogleDocPrototypePayload({ docId: "abc123" }),
    ).toThrow(Response);
  });
});

describe("stripGoogleDocComments", () => {
  it("removes inline comment markers", () => {
    expect(
      stripGoogleDocComments(
        '<h1>Title<a href="#cmnt1">[a]</a><a href="#cmnt2">[b]</a></h1>',
      ),
    ).toBe("<h1>Title</h1>");
  });

  it("truncates the trailing comment-definition block", () => {
    const html =
      '<p>Real content</p><p><a href="#cmnt_ref1">[a]</a>This is a comment</p>';

    expect(stripGoogleDocComments(html)).toBe("<p>Real content</p>");
  });
});

describe("buildGoogleDocPrototypeMessage", () => {
  it("includes the doc title and html", () => {
    const message = buildGoogleDocPrototypeMessage({
      title: "Home Page_v2026",
      html: "<p>HOME_v2026</p>",
    });

    expect(message).toContain("Home Page_v2026");
    expect(message).toContain("<p>HOME_v2026</p>");
  });
});
