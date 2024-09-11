import { getServerSession } from "next-auth";
import axios from "axios";

import LandingPage from "./components/LandingPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ApiResponse } from "@/types/ApiResponse";
import Image from "next/image";

export const revalidate = 3600;

interface Post {
  title: string;
  // image: string;
  author: string;
  // readTime: string;
  content: string;
}

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
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <FeaturedPost post={posts[0]} />
            <section>
              <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
              <div className="space-y-12">
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center gap-6"
                  >
                    <Image
                      src={`https://picsum.photos/300/180?random=${index}`}
                      alt={post.title}
                      height={180}
                      width={300}
                      className="w-full md:w-1/3 aspect-video object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 hover:underline">
                        <Link href={`/post/${index + 1}`}>{post.title}</Link>
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {post.content.split(" ").slice(0, 20).join(" ")}...
                      </p>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage
                            src="/placeholder-avatar.jpg"
                            alt={post.author}
                          />
                          <AvatarFallback>{post.author}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {post.author}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          · {readTime(post.content)} read
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
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
          {post.content.split(" ").slice(0, 20).join(" ")}...
        </p>
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Author" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{post.author}</span>
          <span className="text-sm text-muted-foreground">
            · {readTime(post.content)} read
          </span>
        </div>
      </div>
    </section>
  );
}
