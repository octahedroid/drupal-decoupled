import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/$.tsx", { id: "index" }),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
