import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("demo", "routes/demo.tsx"),
  route("health", "routes/health.ts"),
] satisfies RouteConfig;
