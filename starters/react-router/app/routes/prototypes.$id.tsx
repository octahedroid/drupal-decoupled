import { useUIStream } from "@json-render/react";
import type { Spec } from "@json-render/core";
import { useEffect, useRef } from "react";
import { Link, useRevalidator } from "react-router";

import type { Route } from "./+types/prototypes.$id";
import { SpecRenderer } from "~/integration/layout/SpecRenderer";
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
  const pendingMessage = prototype.pendingMessage;

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

  const activeSpec = (streamingSpec ?? latestSpec) as Spec | null;
  const latestVersion = prototype.versions.at(-1) ?? null;

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

      <div className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0 rounded-2xl border bg-background p-4 shadow-sm md:p-6">
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

        <aside className="space-y-4">
          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Session details</h2>
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
            <h2 className="text-lg font-semibold text-foreground">History preview</h2>
            {prototype.versions.length === 0 ? (
              <p className="text-muted-foreground mt-3 text-sm">
                No persisted versions yet. The first valid generation will land here automatically.
              </p>
            ) : (
              <ol className="mt-4 space-y-3">
                {[...prototype.versions].reverse().map((version, index) => (
                  <li key={`${version.timestamp}-${index}`} className="rounded-xl bg-muted/30 p-3">
                    <p className="text-sm font-medium text-foreground">{version.message}</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {new Date(version.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {error && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 shadow-sm">
              <h2 className="text-destructive text-lg font-semibold">Generation error</h2>
              <p className="mt-2 text-sm text-foreground">
                {error.message || "The streamed prototype could not be completed."}
              </p>
              {pendingMessage && prototypingEnabled && (
                <div className="mt-4">
                  <button
                    type="button"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                    onClick={(event) => {
                      clear();
                      void send(pendingMessage, {
                        prototypeId: prototype.id,
                        sourcePath: prototype.sourcePath,
                        retry: true,
                      });
                    }}
                  />
                    Retry initial generation
                  </button>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
