import { getServerSession } from "next-auth";
import axios from "axios";

import LandingPage from "./components/LandingPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ApiResponse } from "@/types/ApiResponse";
import Image from "next/image";
import BlogItem from "@/components/BlogItem";
import { Separator } from "@/components/ui/separator";
import CategoryCarousel from "./components/CtegoriesCarousel";

export const revalidate = 3600;

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

export default async function Home() {
  const session = await getServerSession();
  // try {

  const res = await axios.get<ApiResponse<Post[]>>(
    `http://localhost:3000/api/posts`
  );
  const posts: Post[] = res.data.data;

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
          <section className="col-span-2 w-full max-w-3xl mx-auto px-1 sm:px-4 py-8 relative">
            <CategoryCarousel className="md:w-full max-w-scr bg-white rounded-none sticky top-0 z-10 mb-12 px-4" />
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
          <section className="col-span-1 px-6 sticky top-0 h-screen py-10 max-w-sm hidden md:block">
            <h4 className="text-lg font-medium mb-4">Trending Posts</h4>
            <div className="gap-12 space-y-2 m">
              {posts.slice(0, 4).map((post, index) => (
                <div className="border-b py-3">
                  <h3 className="text-lg font-bold mb-2">
                    <Link href={`/post/${post.id}`}>{post.title}</Link>
                  </h3>
                  <div className="flex gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={`https://picsum.photos/300/180?random=${Math.floor(
                          Math.random() * 100
                        )}`}
                        alt={post.author.name}
                      />
                      <AvatarFallback>{post.author.name}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {post.author.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      · {readTime(post.content ?? "")} read
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8">Featured Post</h2>
      <div className="group">
        <Image
          src="https://picsum.photos/300/180?random=0"
          height={180}
          width={300}
          alt="Featured post"
          className="w-full aspect-video object-cover rounded-lg mb-6"
        />
        <h3 className="text-2xl font-bold mb-2 group-hover:underline">
          <Link href="/post/featured">{post.title}</Link>
        </h3>
        <p className="text-muted-foreground mb-4">
          {post.content?.split(" ").slice(0, 20).join(" ")}...
        </p>
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Author" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{post.author.name}</span>
          <span className="text-sm text-muted-foreground">
            · {readTime(post.content ?? "")} read
          </span>
        </div>
      </div>
    </section>
  );
}
