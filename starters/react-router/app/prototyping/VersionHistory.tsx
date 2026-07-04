import { RotateCcw, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useFetcher } from "react-router";

interface VersionHistoryEntry {
  message: string;
  timestamp: string;
}

interface VersionHistoryProps {
  prototypeId: string;
  versions: VersionHistoryEntry[];
  selectedIndex: number | null;
  onPreview: (index: number | null) => void;
  onRestoreComplete?: () => void;
}

export function VersionHistory({
  prototypeId,
  versions,
  selectedIndex,
  onPreview,
  onRestoreComplete,
}: VersionHistoryProps) {
  const fetcher = useFetcher<{ ok?: boolean; error?: string; restoredVersionIndex?: number }>();

  useEffect(() => {
    if (fetcher.data?.ok) {
      onRestoreComplete?.();
    }
  }, [fetcher.data, onRestoreComplete]);

  if (versions.length === 0) {
    return (
      <p className="text-muted-foreground mt-3 text-sm">
        No persisted versions yet. The first valid generation will land here automatically.
      </p>
    );
  }

  const previewingLatest = selectedIndex === null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-muted-foreground text-sm">
          Newest first. Preview any version, then restore it append-only like the responsible queens we are.
        </p>
        {!previewingLatest ? (
          <button
            type="button"
            className="border-border hover:bg-muted rounded-md border px-3 py-1.5 text-xs font-medium text-foreground transition-colors"
            onClick={() => onPreview(null)}
          >
            Back to latest
          </button>
        ) : null}
      </div>

      {fetcher.data?.error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {fetcher.data.error}
        </div>
      ) : null}

      <ol className="space-y-3">
        {[...versions]
          .map((version, originalIndex) => ({ version, originalIndex }))
          .reverse()
          .map(({ version, originalIndex }, reverseIndex) => {
            const isSelected = selectedIndex === originalIndex;
            const label = versions.length - reverseIndex;

            return (
              <li
                key={`${version.timestamp}-${originalIndex}`}
                className={[
                  "rounded-xl border p-3 transition-colors",
                  isSelected ? "border-primary bg-primary/5" : "border-border bg-muted/30",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-background rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        v{label}
                      </span>
                      {originalIndex === versions.length - 1 ? (
                        <span className="text-primary inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                          <Sparkles className="size-3" /> Current
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm font-medium text-foreground">{version.message}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(version.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      className="border-border hover:bg-muted rounded-md border px-3 py-1.5 text-xs font-medium text-foreground transition-colors"
                      onClick={() => onPreview(isSelected ? null : originalIndex)}
                    >
                      {isSelected ? "Hide preview" : "Preview"}
                    </button>

                    <fetcher.Form
                      method="post"
                      action={`/api/prototypes/${prototypeId}/restore`}
                    >
                      <input type="hidden" name="versionIndex" value={String(originalIndex)} />
                      <button
                        type="submit"
                        disabled={fetcher.state !== "idle"}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <RotateCcw className="size-3" />
                        Restore
                      </button>
                    </fetcher.Form>
                  </div>
                </div>
              </li>
            );
          })}
      </ol>
    </div>
  );
}
