"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Added AvatarImage import
import { Button } from "@/components/ui/button";
import { Edit, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 border-b border-primary">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                  <Avatar>
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w">
                  <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <Button variant="link" className="p-0 h-max" onClick={() => signOut()}>
                      Sign Out
                    </Button>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="link" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/api/auth/signin" className="mr-4 hover:underline">
                Sign In
              </Link>
              <Link href="/signup" className="hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
