const GOOGLE_DOC_SOURCE_PATH_PREFIX = "gdoc:";
const GOOGLE_DOC_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;

export function buildGoogleDocSourcePath(docId: unknown): string {
  if (typeof docId !== "string" || !GOOGLE_DOC_ID_PATTERN.test(docId.trim())) {
    throw new Response("docId must be a non-empty Google Doc id", { status: 400 });
  }

  return `${GOOGLE_DOC_SOURCE_PATH_PREFIX}${docId.trim()}`;
}

export function isGoogleDocSourcePath(sourcePath: string): boolean {
  return sourcePath.startsWith(GOOGLE_DOC_SOURCE_PATH_PREFIX);
}

export function getGoogleDocId(sourcePath: string): string | null {
  return isGoogleDocSourcePath(sourcePath)
    ? sourcePath.slice(GOOGLE_DOC_SOURCE_PATH_PREFIX.length)
    : null;
}

export function validatePrototypeSourcePath(input: unknown): string {
  if (typeof input !== "string") {
    throw new Response("sourcePath must be a string", { status: 400 });
  }

  const trimmed = input.trim();

  if (!trimmed.startsWith("/")) {
    throw new Response("sourcePath must start with '/'", { status: 400 });
  }

  if (trimmed.startsWith("//")) {
    throw new Response("sourcePath must be a relative path", { status: 400 });
  }

  if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(trimmed)) {
    throw new Response("sourcePath must not include a protocol", { status: 400 });
  }

  const rawPathname = trimmed.split(/[?#]/, 1)[0] ?? trimmed;
  const pathSegments = rawPathname.split("/").filter(Boolean);

  if (pathSegments.includes("..")) {
    throw new Response("sourcePath must not include '..' segments", { status: 400 });
  }

  const parsed = new URL(trimmed, "https://prototype.local");

  if (parsed.origin !== "https://prototype.local") {
    throw new Response("sourcePath must not include a host", { status: 400 });
  }

  return `${parsed.pathname}${parsed.search}`;
}
