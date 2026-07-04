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
