import { Sparkles, WandSparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigation, useSubmit } from "react-router";

import { Bubble, BubbleContent } from "~/components/ui/bubble";
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "~/components/ui/marker";
import {
  Message,
  MessageContent,
  MessageGroup,
  MessageHeader,
} from "~/components/ui/message";
import { MessageScroller } from "~/components/ui/message-scroller";

interface ToolbarProps {
  mode: "source" | "prototype";
  sourcePath: string;
  onPrototypeSubmit?: (message: string) => Promise<void> | void;
  isStreaming?: boolean;
  errorMessage?: string | null;
}

export function Toolbar({
  mode,
  sourcePath,
  onPrototypeSubmit,
  isStreaming = false,
  errorMessage = null,
}: ToolbarProps) {
  const location = useLocation();
  const navigation = useNavigation();
  const submit = useSubmit();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const submittedWhileStreamingRef = useRef(false);

  const isCreating = useMemo(() => {
    if (mode !== "source") {
      return false;
    }

    if (navigation.state === "idle") {
      return false;
    }

    return navigation.formAction?.includes("/api/prototypes/create") ?? false;
  }, [mode, navigation.formAction, navigation.state]);

  const busy = isStreaming || isCreating;
  const displayError = localError ?? errorMessage;

  useEffect(() => {
    if (!isStreaming && !errorMessage && submittedWhileStreamingRef.current) {
      setDraft("");
      submittedWhileStreamingRef.current = false;
    }
  }, [errorMessage, isStreaming]);

  useEffect(() => {
    setLocalError(null);
  }, [location.pathname]);

  const title = mode === "prototype" ? "Iterate prototype" : "AI prototype";
  const description =
    mode === "prototype"
      ? "Describe the next change and we’ll stream a new version live."
      : "Ask for a variation of this page and we’ll open a shareable prototype.";
  const hasDraft = draft.trim().length > 0;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = draft.trim();

    if (!message) {
      setLocalError("Give the AI an instruction first, babe.");
      return;
    }

    setLocalError(null);

    if (mode === "prototype") {
      submittedWhileStreamingRef.current = true;
      void onPrototypeSubmit?.(message);
      return;
    }

    submit(
      {
        sourcePath,
        message,
      },
      {
        method: "post",
        action: "/api/prototypes/create",
      },
    );
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 md:right-6 md:bottom-6">
      {isOpen && (
        <div className="bg-background w-[min(28rem,calc(100vw-2rem))] rounded-2xl border shadow-2xl">
          <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  {mode === "prototype" ? "Live editing" : "Producer flow"}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>

            <button
              type="button"
              className="hover:bg-muted rounded-md p-2 text-muted-foreground transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close toolbar"
            >
              <X className="size-4" />
            </button>
          </div>

          <MessageScroller.Provider>
            <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
              <div className="max-h-64 overflow-hidden rounded-xl border bg-muted/20">
                <MessageScroller.Root className="h-64">
                  <MessageScroller.Viewport className="px-3 py-3">
                    <MessageScroller.Content>
                      <Marker variant="separator">
                        <MarkerIcon>
                          <Sparkles className="size-3.5" />
                        </MarkerIcon>
                        <MarkerContent>
                          {mode === "prototype" ? "Prototype conversation" : "Prototype request preview"}
                        </MarkerContent>
                      </Marker>

                      <MessageScroller.Item>
                        <Message align="start">
                          <MessageContent>
                            <MessageHeader>System</MessageHeader>
                            <Bubble variant="muted">
                              <BubbleContent>
                                {description}
                              </BubbleContent>
                            </Bubble>
                          </MessageContent>
                        </Message>
                      </MessageScroller.Item>

                      <MessageScroller.Item>
                        <Message align="start">
                          <MessageContent>
                            <MessageHeader>Context</MessageHeader>
                            <Bubble variant="outline">
                              <BubbleContent>
                                Source page: <span className="font-medium">{sourcePath}</span>
                              </BubbleContent>
                            </Bubble>
                          </MessageContent>
                        </Message>
                      </MessageScroller.Item>

                      {hasDraft ? (
                        <MessageScroller.Item>
                          <MessageGroup>
                            <Message align="end">
                              <MessageContent>
                                <MessageHeader>You</MessageHeader>
                                <Bubble align="end" variant="default">
                                  <BubbleContent>{draft}</BubbleContent>
                                </Bubble>
                              </MessageContent>
                            </Message>
                          </MessageGroup>
                        </MessageScroller.Item>
                      ) : null}

                      {busy ? (
                        <MessageScroller.Item>
                          <Message align="start">
                            <MessageContent>
                              <MessageHeader>System</MessageHeader>
                              <Bubble variant="tinted">
                                <BubbleContent>
                                  {mode === "prototype"
                                    ? "Streaming the next version now…"
                                    : "Creating your prototype session…"}
                                </BubbleContent>
                              </Bubble>
                            </MessageContent>
                          </Message>
                        </MessageScroller.Item>
                      ) : null}

                      {displayError ? (
                        <MessageScroller.Item>
                          <Message align="start">
                            <MessageContent>
                              <MessageHeader>Error</MessageHeader>
                              <Bubble variant="destructive">
                                <BubbleContent>{displayError}</BubbleContent>
                              </Bubble>
                            </MessageContent>
                          </Message>
                        </MessageScroller.Item>
                      ) : null}
                    </MessageScroller.Content>
                  </MessageScroller.Viewport>
                  <MessageScroller.Button>
                    Jump to latest
                  </MessageScroller.Button>
                </MessageScroller.Root>
              </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="prototype-toolbar-message">
                What should change?
              </label>
              <textarea
                id="prototype-toolbar-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                disabled={busy}
                rows={4}
                placeholder={
                  mode === "prototype"
                    ? "Move the CTA above the hero and add a pricing section with 3 plans"
                    : "Create a prototype with the CTA above the hero"
                }
                className="border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 min-h-28 w-full rounded-xl border bg-transparent px-3 py-3 text-sm shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-muted-foreground text-xs">
                {busy
                  ? mode === "prototype"
                    ? "Streaming the next version now…"
                    : "Creating your prototype session…"
                  : "Constrained by the catalog, not freestyle HTML delusion."}
              </p>

              <button
                type="submit"
                disabled={busy}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? <Sparkles className="size-4 animate-pulse" /> : <WandSparkles className="size-4" />}
                {mode === "prototype" ? "Apply" : "Create prototype"}
              </button>
            </div>
            </form>
          </MessageScroller.Provider>
        </div>
      )}

      <button
        type="button"
        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition-colors"
        onClick={() => setIsOpen((current) => !current)}
      >
        <Sparkles className="size-4" />
        {isOpen ? "Hide AI toolbar" : "Open AI toolbar"}
      </button>
    </div>
  );
}
