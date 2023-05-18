export const syncDrupalPreviewRoutes = (path: string) => {
  if (window && window.top !== window.self) {
    window.parent.postMessage(
      {
        type: "REMIX_DRUPAL_ROUTE_SYNC",
        path,
      },
      "*"
    );
  }
};
