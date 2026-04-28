import { redirect } from "react-router";

export function authLoader() {
  const token = localStorage.getItem("token");

  // if (!token) {
  //   throw redirect("/login");
  // }

  return null;
}