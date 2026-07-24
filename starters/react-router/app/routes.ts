import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/$.tsx", { id: "index" }),
  route("api/prototypes/create", "routes/api/prototypes.create.ts"),
  route("api/prototypes/:id/generate", "routes/api/prototypes.generate.ts"),
  route("api/prototypes/:id/restore", "routes/api/prototypes.restore.ts"),
  route("form/contact_form", "routes/forms/contact_form.ts"),
  route("prototypes", "routes/prototypes._index.tsx"),
  route("prototypes/:id", "routes/prototypes.$id.tsx"),
  route("prototypes/doc", "routes/prototypes.docs.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
