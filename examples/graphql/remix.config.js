/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
  server: "./server.js",
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["workerd", "worker", "browser"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverPlatform: "neutral",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  tailwind: true,
  browserNodeBuiltinsPolyfill: {
    modules: {
      events: true,
      string_decoder: true,
      buffer: true,
    }
  },
  serverNodeBuiltinsPolyfill: {
    modules: {
      events: 'empty',
      stream: 'empty',
      util: true,
    }
  },
};
