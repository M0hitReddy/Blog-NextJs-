"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Added AvatarImage import
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold ">
          Blog.
        </Link>
        <div className="flex gap-3 items-center">
          {session ? (
            <>
              {/* <Link href="/search" className="mr-4">Search</Link> */}
              <Input className="w-64 rounded-full" placeholder="Search" />
              {/* <Link href="/profile" className="mr-4">Profile</Link> */}
              <Link href="/write" className="flex gap-2 hover:underline">
                <Edit width={20} />
                Write
              </Link>
              <Avatar>
                <AvatarImage src={session.user?.image || ""} />
                <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="link" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/api/auth/signin" className="mr-4 hover:underline">
                Sign In
              </Link>
              <Link href="/register" className="hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
