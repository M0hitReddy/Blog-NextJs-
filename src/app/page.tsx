import { getServerSession } from "next-auth";
import axios from "axios";

import LandingPage from "./components/LandingPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ApiResponse } from "@/types/ApiResponse";
// import Image from "next/image";
import BlogItem from "@/components/BlogItem";
import { Separator } from "@/components/ui/separator";
import CategoryCarousel from "./components/CtegoriesCarousel";
// import { Key } from "lucide-react";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Post } from "@/types/schemas";

// export const revalidate = 3600;
// export const forceDynamic = true;

function readTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(" ");
  const totalWords = words.length;
  const minutes = Math.ceil(totalWords / wordsPerMinute);
  if (minutes < 1) {
    return "Less than 1 min";
  } else if (minutes === 1) {
    return "1 min";
  } else {
    return `${minutes} mins`;
  }
}

//
function extractTextFromJson(jsonContent: any): string {
  let text = "";
  if (jsonContent && jsonContent.content) {
    //
    jsonContent.content.forEach((node: any) => {
      if (node.type === "text") {
        text += node.text + " ";
      } else if (node.content) {
        text += extractTextFromJson(node);
      }
    });
  }
  return text.trim();
}

export default async function Home() {
  const session = await getServerSession();
  // useTheme().setTheme("system");

  console.log(session?.user.image, "session?.user.image");
  // try {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await axios.get<ApiResponse<Post[]>>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?published=true`
  );
  // console.log(process.env.NEXT_PUBLIC_BASE_URL);
  let posts = res.data.data;
  // Filter out posts with invalid JSON content
  posts = posts.filter((post) => {
    try {
      JSON.parse(post?.content ?? "");
      return true;
    } catch (error) {
      // console.error(`Error parsing content for post ${post.id}:`, error);
      return false;
    }
  });

  // Parse the content of the remaining posts and extract text
  posts = posts.map((post) => {
    let content = "";
    try {
      const jsonContent = JSON.parse(post?.content ?? "");
      content = extractTextFromJson(jsonContent);
    } catch (error) {
      console.error(`Error parsing content for post ${post.id}:`, error);
    }
    return { ...post, content };
  });

  if (!res.data.success) {
    console.error(res.data.message);
  }
  // } catch (error) {
  //   console.error(error);
  // }

  return (
    <>
      {/* <Navbar /> */}
      {!session ? (
        <LandingPage />
      ) : (
        // https://picsum.photos/300/180?random=${i}
        <main className="container md:grid md:grid-cols-3 md:gap-4 mx-auto px-0 sm:px-4 relative">
          <section className="col-span-2 w-full max-w-3xl justify-end  mx-auto px-1 sm:px-4 py-8 relative">
            <CategoryCarousel className="md:w-full max-w-scr bg-background rounded-none sticky top-0 z-10 mb-12 px-4" />
            <div className="space-y-6 mt-4">
              <div className="space-y-6 w-auto">
                {posts.map((post, index) => (
                  <BlogItem key={index} post={post} />
                ))}
              </div>
            </div>
          </section>
          <Separator
            orientation="vertical"
            className="absolute left-2/3 hidden md:block"
          />

          <section className="col-span-1 w-full px-6 sticky top-0 h-screen my-10 max-w-sm hidden md:block ">
            <ScrollArea className="col-span-1 w-full px-6 sticky top-0 h-screen  max-w-sm hidden md:block overflow-auto">
              <h4 className="text-lg font-medium mb-4">Trending Posts</h4>
              <div className="gap-12 space m">
                {posts.map((post) => (
                  <React.Fragment key={post.id}>
                    <div className="py-3">
                      <h3 className="text-lg font-bold mb-2">
                        <Link href={`/post/${post.id}`}>
                          {post.title
                            ? post.title
                            : post.content?.substring(0, 20)}
                        </Link>
                      </h3>
                      <div className="flex gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage
                            src={post.author?.image}
                            alt={post.author?.name}
                          />
                          <AvatarFallback>{post.author?.name}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {post.author?.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          · {readTime(post.content ?? "")} read
                        </span>
                      </div>
                    </div>
                    <Separator className="my-3" />
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </section>
        </main>
      )}
    </>
  );
}
