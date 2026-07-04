import * as React from "react";

import { cn } from "~/lib/utils";

interface MessageScrollerContextValue {
  viewportRef: React.RefObject<HTMLDivElement | null>;
}

const MessageScrollerContext = React.createContext<
  MessageScrollerContextValue | undefined
>(undefined);

function useMessageScrollerContext() {
  const context = React.useContext(MessageScrollerContext);

  if (!context) {
    throw new Error("MessageScroller components must be used within MessageScroller.Provider");
  }

  return context;
}

function Provider({ children }: React.ComponentProps<"div">) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <MessageScrollerContext.Provider value={{ viewportRef }}>
      {children}
    </MessageScrollerContext.Provider>
  );
}

function Root({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-scroller-root"
      className={cn("relative flex min-h-0 flex-1 flex-col overflow-hidden", className)}
      {...props}
    />
  );
}

function Viewport({ className, ...props }: React.ComponentProps<"div">) {
  const { viewportRef } = useMessageScrollerContext();

  return (
    <div
      ref={viewportRef}
      data-slot="message-scroller-viewport"
      className={cn("flex min-h-0 flex-1 flex-col overflow-y-auto", className)}
      {...props}
    />
  );
}

function Content({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-scroller-content"
      className={cn("flex min-h-full flex-col gap-3 p-1", className)}
      {...props}
    />
  );
}

function Item({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-scroller-item"
      className={cn("min-w-0", className)}
      {...props}
    />
  );
}

function Button({ className, onClick, ...props }: React.ComponentProps<"button">) {
  const { viewportRef } = useMessageScrollerContext();

  return (
    <button
      type="button"
      data-slot="message-scroller-button"
      className={cn(
        "border-border bg-background text-foreground hover:bg-muted absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm transition-colors",
        className,
      )}
      onClick={(event) => {
        viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: "smooth" });
        onClick?.(event);
      }}
      {...props}
    />
  );
}

export const MessageScroller = {
  Provider,
  Root,
  Viewport,
  Content,
  Item,
  Button,
};
