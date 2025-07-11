import type { Route } from "./+types/home";
import Header from "../components/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Race Strategy App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <h1>Home</h1>
    </>
  );
}
