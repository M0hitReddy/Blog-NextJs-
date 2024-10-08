"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
// import { getSession, signIn } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

// const description =
//   "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export default function AuthForm({ type }: { type: "signup" | "login" }) {
  // const router = useRouter();

  // useEffect(() => {
  //   async function checkSession() {
  //     const session = await getSession();
  //     if (session) {
  //       // redirect to home page
  //       router.push("/");
  //     }
  //   }
  //   checkSession();
  // }, [router]);

  return (
    <Card className="mx-auto max-w-sm w-svw mt-20 ">
      <CardHeader>
        <CardTitle className="text-2xl">
          {type === "login" ? "Login" : "Register"}
        </CardTitle>
        <CardDescription>
          Enter your email and password below{" "}
          {type === "login" && "to login to your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={() => signIn("credentials", { callbackUrl: "/" })}
          >
            {type === "login" ? "Login" : "Sign Up"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google")}
          >
            {type === "signup" ? "Sign Up" : "Login"} with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}

          <Link
            href={type === "login" ? "/signup" : "/login"}
            className="underline"
          >
            {type === "login" ? "Sign Up" : "Login"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
