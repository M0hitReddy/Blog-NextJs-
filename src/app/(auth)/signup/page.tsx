"use client";
import AuthForm from "../components/AuthForm";
// import { getSession, signIn } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

// const description =
//   "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export default function Auth() {
  return <AuthForm type="signup" />;
}
