import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Race Strategy App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Admin() {
  return <h1>Admin</h1>;
}
