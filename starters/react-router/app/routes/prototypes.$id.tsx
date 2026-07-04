import { useUIStream } from "@json-render/react";
import type { Spec } from "@json-render/core";
import { Copy, Info, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useFetcher, useRevalidator } from "react-router";

import type { Route } from "./+types/prototypes.$id";
import { SpecRenderer } from "~/integration/layout/SpecRenderer";
import { VersionHistory } from "~/prototyping/VersionHistory";
import { Toolbar } from "~/prototyping/Toolbar";
import { getPrototypingConfig } from "~/prototyping/config.server";
import { getPrototypeStore } from "~/prototyping/store";

export async function loader({ params }: Route.LoaderArgs) {
  const prototypeId = params.id;

  if (!prototypeId) {
    throw new Response("Prototype id is required", { status: 400 });
  }

  const store = getPrototypeStore();
  const prototype = await store.get(prototypeId);

  if (!prototype) {
    throw new Response("Prototype not found", { status: 404 });
  }

  return {
    prototype: {
      id: prototype.id,
      sourcePath: prototype.sourcePath,
      createdAt: prototype.createdAt,
      pendingMessage: prototype.pendingMessage,
      versions: prototype.versions.map((version) => ({
        spec: version.spec,
        message: version.message,
        timestamp: version.timestamp,
      })),
    },
    latestSpec: prototype.versions.at(-1)?.spec ?? null,
    prototypingEnabled: getPrototypingConfig().prototypingEnabled,
  };
}

export default function PrototypeViewer({ loaderData }: Route.ComponentProps) {
  const { prototype, latestSpec, prototypingEnabled } = loaderData;
  const revalidator = useRevalidator();
  const autoStartedRef = useRef(false);
  const renderSurfaceRef = useRef<HTMLDivElement | null>(null);
  const pendingMessage = prototype.pendingMessage;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<null | "html" | "spec">(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const {
    spec: streamingSpec,
    isStreaming,
    error,
    send,
    clear,
  } = useUIStream({
    api: `/api/prototypes/${prototype.id}/generate`,
    onComplete: () => {
      revalidator.revalidate();
    },
  });

  useEffect(() => {
    if (
      !prototypingEnabled ||
      !pendingMessage ||
      prototype.versions.length > 0 ||
      autoStartedRef.current
    ) {
      return;
    }

    autoStartedRef.current = true;

    void send(pendingMessage, {
      prototypeId: prototype.id,
      sourcePath: prototype.sourcePath,
      bootstrap: true,
    });
  }, [
    pendingMessage,
    prototype.id,
    prototype.sourcePath,
    prototype.versions.length,
    prototypingEnabled,
    send,
  ]);

  useEffect(() => {
    if (!isStreaming && latestSpec && streamingSpec) {
      clear();
    }
  }, [clear, isStreaming, latestSpec, streamingSpec]);

  useEffect(() => {
    if (!copyFeedback) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopyFeedback(null);
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [copyFeedback]);

  const activeSpec =
    previewIndex !== null
      ? ((prototype.versions[previewIndex]?.spec ?? null) as Spec | null)
      : ((streamingSpec ?? latestSpec) as Spec | null);
  const latestVersion = prototype.versions.at(-1) ?? null;
  const retryMessage = pendingMessage ?? latestVersion?.message ?? "";

  async function handleCopyHtml() {
    const html = renderSurfaceRef.current?.innerHTML?.trim();

    if (!html) {
      setCopyError("No rendered HTML available yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(html);
      setCopyError(null);
      setCopyFeedback("html");
    } catch {
      setCopyError("Could not copy rendered HTML.");
    }
  }

  async function handleCopySpec() {
    if (!activeSpec) {
      setCopyError("No spec available yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(activeSpec, null, 2));
      setCopyError(null);
      setCopyFeedback("spec");
    } catch {
      setCopyError("Could not copy the spec JSON.");
    }
  }

  return (
    <main className="bg-background min-h-screen">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                Prototype
              </span>
              <span className="text-muted-foreground text-sm">
                {isStreaming ? "Generating live" : latestVersion ? "Saved snapshot" : "Awaiting first version"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">{prototype.sourcePath}</h1>
            <p className="text-muted-foreground text-sm">
              Created {new Date(prototype.createdAt).toLocaleString()} · {prototype.versions.length} version
              {prototype.versions.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopyHtml}
              className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-foreground transition-colors"
            >
              <Copy className="size-4" />
              Copy HTML
            </button>
            <button
              type="button"
              onClick={handleCopySpec}
              className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-foreground transition-colors"
            >
              <Copy className="size-4" />
              Copy spec
            </button>
            <button
              type="button"
              onClick={() => setIsDrawerOpen((current) => !current)}
              className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-foreground transition-colors"
            >
              {isDrawerOpen ? <PanelRightClose className="size-4" /> : <PanelRightOpen className="size-4" />}
              Details
            </button>
            <Link
              to="/prototypes"
              className="border-border hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium text-foreground transition-colors"
            >
              All prototypes
            </Link>
            <Link
              to={prototype.sourcePath}
              className="border-border hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium text-foreground transition-colors"
            >
              Open source page
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        {copyFeedback || copyError ? (
          <div className="mb-4 rounded-xl border bg-background px-4 py-3 text-sm shadow-sm">
            <p className={copyError ? "text-destructive" : "text-foreground"}>
              {copyError
                ? copyError
                : copyFeedback === "html"
                  ? "Rendered HTML copied to clipboard."
                  : "Spec JSON copied to clipboard."}
            </p>
          </div>
        ) : null}
      </div>

      <div className="px-4 py-4 md:px-6 md:py-6">
        <section
          ref={renderSurfaceRef}
          className="min-w-0 rounded-2xl border bg-background p-4 shadow-sm md:p-6"
        >
          {activeSpec ? (
            <SpecRenderer spec={activeSpec} loading={isStreaming} />
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center">
              <p className="text-lg font-semibold text-foreground">
                {isStreaming ? "Building your prototype…" : "No saved prototype spec yet"}
              </p>
              <p className="text-muted-foreground mt-2 max-w-md">
                {isStreaming
                  ? "Streaming patches should start painting the page live in a moment. Main character energy, but with actual data integrity."
                  : "This session is waiting for its first valid generation."}
              </p>
            </div>
          )}
        </section>
      </div>

      {isDrawerOpen ? (
        <>
          <button
            type="button"
            aria-label="Close details drawer"
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setIsDrawerOpen(false)}
          />
          <aside className="bg-background fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l shadow-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div className="flex items-center gap-2">
                <Info className="text-primary size-4" />
                <h2 className="text-lg font-semibold text-foreground">Prototype details</h2>
              </div>
              <button
                type="button"
                className="border-border hover:bg-muted rounded-md border px-3 py-2 text-sm font-medium text-foreground transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div className="rounded-2xl border bg-background p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">Session details</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Prototype id</dt>
                    <dd className="mt-1 break-all text-foreground">{prototype.id}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Status</dt>
                    <dd className="mt-1 text-foreground">
                      {isStreaming
                        ? "Streaming"
                        : latestVersion
                          ? "Ready"
                          : "Waiting for first valid version"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Latest instruction</dt>
                    <dd className="mt-1 text-foreground">
                      {latestVersion?.message ?? pendingMessage ?? "None yet"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border bg-background p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">History preview</h3>
                <div className="mt-4">
                  <VersionHistory
                    prototypeId={prototype.id}
                    versions={prototype.versions}
                    selectedIndex={previewIndex}
                    onPreview={setPreviewIndex}
                    onRestoreComplete={() => {
                      setPreviewIndex(null);
                      revalidator.revalidate();
                    }}
                  />
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 shadow-sm">
                  <h3 className="text-destructive text-lg font-semibold">Generation error</h3>
                  <p className="mt-2 text-sm text-foreground">
                    {error.message || "The streamed prototype could not be completed."}
                  </p>
                  {pendingMessage && prototypingEnabled ? (
                    <div className="mt-4">
                      <button
                        type="button"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                        onClick={() => {
                          clear();
                          void send(retryMessage, {
                            prototypeId: prototype.id,
                            sourcePath: prototype.sourcePath,
                            retry: true,
                          });
                        }}
                      >
                        Retry initial generation
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </aside>
        </>
      ) : null}

      {prototypingEnabled ? (
        <Toolbar
          mode="prototype"
          sourcePath={prototype.sourcePath}
          isStreaming={isStreaming}
          errorMessage={error?.message ?? null}
          onPrototypeSubmit={(message) =>
            send(message, {
              prototypeId: prototype.id,
              sourcePath: prototype.sourcePath,
            })
          }
        />
      ) : null}
    </main>
  );
}
