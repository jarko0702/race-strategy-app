import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "./routes/home.tsx"),
  route("admin", "./routes/admin.tsx"),
  route("login", "./routes/login.tsx"),
] satisfies RouteConfig;
