import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "./routes/home.tsx"),
  route("admin", "./routes/admin.jsx"),
  route("profile", "./routes/profile.jsx"),
  route("signin", "./routes/signIn.jsx"),
  route("signup", "./routes/signUp.jsx"),
] satisfies RouteConfig;
