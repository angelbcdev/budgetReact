import { redirect } from "react-router";

export async function authLoader() {
  const user = localStorage.getItem("user");

  if (!user) {
    throw redirect("/login"); // ✅ correct
  }

  return null; // ✅ always return something
}

