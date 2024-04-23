export const syncDrupalPreviewRoutes = (path: string) => {
  if (window && window.top !== window.self) {
    window.parent.postMessage(
      {
        type: "DECOUPLED_PREVIEW_IFRAME_ROUTE_SYNC",
        path,
      },
      "*"
    );
  }
};
