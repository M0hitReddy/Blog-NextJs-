import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// interface FeaturedPostProps {
//   title: string;
//   description: string;
//   author: string;
//   date: string;
// }
// const FeaturedPost = ({
//   title,
//   description,
//   author,
//   date,
// }: FeaturedPostProps) => (
//   <div className="mb-8">
//     <h2 className="text-xl font-bold mb-2">{title}</h2>
//     <p className="text-gray-700 mb-2">{description}</p>
//     <div className="flex items-center text-sm text-gray-500">
//       <span>{author}</span>
//       <span className="mx-2">·</span>
//       <span>{date}</span>
//     </div>
//   </div>
// );

export default function LandingPage() {
  return (
    // <div className="min-h-screen bg-white">
    <main className=" mx-aut pb-12">
      {/* <header className="text-center mb-16 py-24 sm:py-32 md:py-40 lg:py-44">
        <div className="container">
          <h1 className="text-8xl font-bold font-sans mb-4">Stay curious.</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>

          <Link href="/login">
            <Button
              variant="default"
              className="rounded-full text-lg px-8 py-7 bg-primary text-primary-foreground"
            >
              Start reading
            </Button>
          </Link>
        </div>
      </header> */}
      <header className="flex-grow flex items-center py-24 sm:py-32 md:py-40 lg:py-48 mx-auto relative">
        <div className="container w-full mx-auto px-4 flex flex-col md:flex-row items-center justify-between ">
          <div className="w-full md:w1/2 pr-0 md:pr-8 mb-8 md:mb-0 mx-auto">
            <h1 className="text-7xl md:text-8xl font-[600] font-sans mb-4">
              Human stories & ideas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
            Discover stories, thinking, and expertise from writers on any topic.
            </p>
            <Button className="  text-primary-foreground rounded-full px-6 py-3 h-max text-lg font-normal ">
              Start reading
            </Button>
          </div>
          <div className="md:w-96 xl:opacity-100 opacity-40 w-max absolute md:flex right-0 top-1/2 -z-10 md:w1/2 flex justify-center items-center -translate-y-1/2">
            {/* <HeaderLogo className="w-full max-w-md h-auto" /> */}
            <Image
              alt="Header logo"
              className="w-full max-w-md h-auto"
              height="200"
              src="https://miro.medium.com/v2/format:png/4*SdjkdS98aKH76I8eD0_qjw.png"
              width="200"
            />
          </div>
        </div>
      </header>

      <section className="w-full py-16 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Featured Posts
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 mt-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col items-start space-y-2 gap-2 border border-primary rounded-xl bg-background"
              >
                <Image
                  alt="Post thumbnail"
                  className="aspect-[1/auto overflow-hidden rounded-tl-xl w-full h-[260px] rounded-tr-xl object-cover"
                  height="200"
                  src={`https://picsum.photos/300/180?random=${i}`}
                  width="300"
                />
                <div className="pb-3 px-2 flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Blog Post Title {i}</h3>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <Link
                    className="text-primary flex gap-1 items-center border-l-0 border-primary -translate-x-2 rounded-r-full border w-ma justify-center px-1 pr2 py-2 hover:underline"
                    href="#"
                  >
                    Read More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Start Your Journey
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community of writers and readers. Share your stories,
                ideas, and perspectives with the world.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2 sm:translate-x-6">
                <Input
                  className="max-w-lg flex-1 rounded-full"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit" className="rounded-full">
                  Get Started
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    // </div>
  );
}
