"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Added AvatarImage import
import { Button } from "@/components/ui/button";
import { Edit, LogOut, Menu, Moon, Sun, User } from "lucide-react";
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
// import { getServerSession } from "next-auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { NavbarClientWrapper } from "./nav-client-wrapper";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEditorContext } from "@/contexts/editor";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import PublishPreviewDialog from "../edit/[postId]/PublishPreviewDialog";
import { useTheme } from "next-themes";
// import { useTheme } from "next-themes";
// import Image from "next/image";

export default function Navbar() {
  // const session = await getServerSession();
  const { data: session, status } = useSession();
  console.log(session, "session");
  const theme = useTheme()
  // useTheme().setTheme("system");
  const [isLoading, setIsLoading] = useState(true);
  const { editor, title } = useEditorContext();
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const path = usePathname();
  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  const handlePublish = async () => {
    // Here you would typically send the data to your backend
    if(path.startsWith("/new")) 
    await handleSaveClick();
    setPreviewOpen(true);
    // toast({
    //   title: "Blog post published!",
    //   description: "Your blog post has been successfully saved and published.",
    //   variant: "default",
    // });
  };

  const handleSaveClick = async () => {
    // Here you would typically send the data to your backend
    try {
      if (path.startsWith("/new")) {
        const res = await axios.post<ApiResponse<string>>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
          title: title,
          content: editor?.getJSON(),
          status: "draft",
        });
        const postId = res.data.data;
        console.log(postId, "postId");
        
        router.push(`/edit/${postId}`);
        
      }
      else {
        console.log(path.split("/").pop(), "path");
        await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post?postId=${path.split("/").pop()}`, {
          title: title,
          content: editor?.getJSON(),
          status: "draft",
        });
        
      }
      toast({
        title: "Draft saved!",
        description: "Your blog post has been successfully saved as a draft.",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Draft saved!",
        description: "Error saving draft.",
        variant: "destructive",
      });
    }
    
  };

  // if (isLoading) {
  //   return null; // or you can return a loading indicator
  // }
  return (
    <nav className="p-4 border-b border-primary">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-sans font-extrabold text-center flex items-center">
          Aura&nbsp;<strong className="text-5xl font-serif">&#8734;</strong>
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

        {path.startsWith("/new") || path.startsWith("/edit") ? (
          <div className="flex justify-end space-x-4 mt-auto">
            <PublishPreviewDialog isOpen={previewOpen} setIsOpen={setPreviewOpen} />
            <Button variant="outline" onClick={handleSaveClick} className="rounded-full hover:bg-transparent hover:border-primary duration-300 transition-all">
              Save Draft
            </Button>
            <Button onClick={handlePublish} className="rounded-full hover:ring-2 hover:ring-primary hover:ring-offset-2 duration-200 transition-all">Publish</Button>
          </div>
        ) : (
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
                    <DropdownMenuTrigger
                      asChild
                      className="hover:cursor-pointer"
                    >
                      <Avatar>
                        <AvatarImage src={session?.user.image || ""} />
                        <AvatarFallback>
                          {session?.user?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* <Image height={180} width={300} src={session.user.image} alt="" /> */}
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
                      <DropdownMenuItem className="p-0">
                        <Button
                          variant="ghost"
                          className="p-2 h-max flex justify-between w-full"
                          onClick={() => theme.setTheme(theme.theme === "light" ? "dark" : "light")}
                        >
                          {theme.theme === "light" ? (
                            <>
                              <Moon className="mr-2 h-4 w-4" />
                              Dark Mode
                            </>
                          ) : (
                            <>
                              <Sun className="mr-2 h-4 w-4" />
                              Light Mode
                            </>
                          )}
                          <DropdownMenuShortcut>⇧⌘T</DropdownMenuShortcut>
                        </Button>
                      </DropdownMenuItem>

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
                  <Link
                    href="/api/auth/signin"
                    className="mr-4 hover:underline"
                  >
                    Sign In
                  </Link>
                  <Link href="/signup" className="hover:underline">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )
        )}
      </div>
    </nav>
  );
}
