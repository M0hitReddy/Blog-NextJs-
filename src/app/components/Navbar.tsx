"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Added AvatarImage import
import { Button } from "@/components/ui/button";
import { Edit, LogOut, Menu, Package2, Search, User } from "lucide-react";
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
import { getServerSession } from "next-auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavbarClientWrapper } from "./nav-client-wrapper";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  // const session = await getServerSession();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const path = usePathname();
  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  const handlePublish = async () => {
    // Here you would typically send the data to your backend
    toast({
      title: "Blog post published!",
      description: "Your blog post has been successfully saved and published.",
      variant: "default",
    });
  };

  // if (isLoading) {
  //   return null; // or you can return a loading indicator
  // }
  return (
    <nav className="p-4 border-b border-primary">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold ">
          Blog.
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 sm:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="text-3xl font-extrabold mb-8">
                Blog.
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Edit width={20} />
                Write
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        {path.startsWith("/new") ? (
          <div className="flex justify-end space-x-4 mt-auto">
            <Button variant="outline">Save Draft</Button>
            <Button onClick={handlePublish}>Publish</Button>
          </div>
        ):
        !isLoading && (
          <div className="hidden sm:flex gap-3 items-center">
            {session ? (
              <>
                {/* <Link href="/search" className="mr-4">Search</Link> */}
                <Input className="w-64 rounded-full" placeholder="Search" />
                {/* <Link href="/profile" className="mr-4">Profile</Link> */}
                <Link
                  href="/new"
                  className="flex gap-2 text-lg items-center  hover:border-b"
                >
                  <Edit width={20} />
                  Write
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                    <Avatar>
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback>
                        {session?.user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w">
                    <DropdownMenuLabel>
                      {session?.user?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0">
                      <Button
                        variant="ghost"
                        className="p-2 h-max flex justify-between w-full"
                        onClick={() => signOut()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="default"
                  className="rounded-full"
                  onClick={() => signOut()}
                >
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
        )}
      </div>
    </nav>

    // <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    //   <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
    //     <Link
    //       href="#"
    //       className="flex items-center gap-2 text-lg font-semibold md:text-base"
    //     >
    //       Blog.
    //     </Link>
    //   </nav>
    //   <Sheet>
    //     <SheetTrigger asChild>
    //       <Button variant="outline" size="icon" className="shrink-0 md:hidden">
    //         <Menu className="h-5 w-5" />
    //         <span className="sr-only">Toggle navigation menu</span>
    //       </Button>
    //     </SheetTrigger>
    //     <SheetContent side="left">
    //       <nav className="grid gap-6 text-lg font-medium">
    //         <Link
    //           href="#"
    //           className="flex items-center gap-2 text-lg font-semibold"
    //         >
    //           <Package2 className="h-6 w-6" />
    //           <span className="sr-only">Acme Inc</span>
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-foreground"
    //         >
    //           Dashboard
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-foreground"
    //         >
    //           Orders
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-foreground"
    //         >
    //           Products
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-foreground"
    //         >
    //           Customers
    //         </Link>
    //         <Link href="#" className="hover:text-foreground">
    //           Settings
    //         </Link>
    //       </nav>
    //     </SheetContent>
    //   </Sheet>
    //   <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
    //     <form className="ml-auto flex-1 sm:flex-initial">
    //       <div className="relative">
    //         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    //         <Input
    //           type="search"
    //           placeholder="Search products..."
    //           className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
    //         />
    //       </div>
    //     </form>
    //     <Link href="/write" className="flex gap-2 hover:underline">
    //       <Edit width={20} />
    //       Write
    //     </Link>
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild className="hover:cursor-pointer">
    //         <Avatar>
    //           <AvatarImage src={session?.user?.image || ""} />
    //           <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
    //         </Avatar>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent className="w">
    //         <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuGroup>
    //           <DropdownMenuItem>
    //             <User className="mr-2 h-4 w-4" />
    //             <span>Profile</span>
    //             <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    //           </DropdownMenuItem>
    //         </DropdownMenuGroup>

    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem className="p-0">
    //           <Link
    //             href={"/signout"}
    //             className="p-2 w-full h-max flex items-center"
    //             // onClick={() => signOut()}
    //           >
    //             <LogOut className="mr-2 h-4 w-4" />
    //             Sign Out
    //             <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    //           </Link>
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //     <Link href={"/signout"} className="hover:underline">
    //       Sign Out
    //     </Link>
    //   </div>
    // </header>
  );
}
