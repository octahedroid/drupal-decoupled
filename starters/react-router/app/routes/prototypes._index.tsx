import { Link } from "react-router";

import type { Route } from "./+types/prototypes._index";
import { getPrototypeStore } from "~/prototyping/store";

export async function loader(_args: Route.LoaderArgs) {
  const store = getPrototypeStore();
  const prototypes = await store.list();

  return {
    prototypes: prototypes.map((prototype) => ({
      id: prototype.id,
      sourcePath: prototype.sourcePath,
      label: prototype.label,
      createdAt: prototype.createdAt,
      versionCount: prototype.versions.length,
      pendingMessage: prototype.pendingMessage,
      latestVersion: prototype.versions.at(-1)
        ? {
            message: prototype.versions.at(-1)?.message ?? "",
            timestamp: prototype.versions.at(-1)?.timestamp ?? prototype.createdAt,
          }
        : null,
    })),
  };
}

export default function PrototypeIndex({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-10 space-y-3">
        <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
          Prototypes
        </p>
        <h1 className="text-4xl font-bold text-foreground">Prototype sessions</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Shareable prototype snapshots with append-only history. Love that for auditability.
        </p>
      </div>

      {loaderData.prototypes.length === 0 ? (
        <div className="bg-muted/40 rounded-xl border p-8 text-center">
          <p className="text-lg font-semibold text-foreground">No prototypes yet</p>
          <p className="text-muted-foreground mt-2">
            Create one from a CMS-rendered page once the toolbar flow lands.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {loaderData.prototypes.map((prototype) => (
            <Link
              key={prototype.id}
              to={`/prototypes/${prototype.id}`}
              className="hover:border-primary/40 hover:bg-muted/30 block rounded-xl border p-5 transition-colors"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Source:{" "}
                    <span className="text-primary">
                      {prototype.label ?? prototype.sourcePath}
                    </span>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Created {new Date(prototype.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-foreground">
                    {prototype.latestVersion?.message ?? prototype.pendingMessage ?? "Waiting for first generation"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-muted rounded-full px-3 py-1 text-foreground">
                    {prototype.versionCount} version{prototype.versionCount === 1 ? "" : "s"}
                  </span>
                  <span className="bg-primary/10 text-primary rounded-full px-3 py-1">
                    {prototype.latestVersion ? "Ready" : "Draft"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
