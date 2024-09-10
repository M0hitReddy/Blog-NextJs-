// import { redirect } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import User from "./user";
// import { Button } from "@/components/ui/button";
// import { signOut } from "next-auth/react";
// import Navbar from "./navbar";
import LandingPage from "./components/LandingPage";
import axios from "axios";
// import next from "next";

// export const dynamic = 'force-dynamic';
export const revalidate = 3600;
// export async function getStaticProps() {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//   return {
//     props: {
//       posts: res.data,
//     },
//   };
// }

export default async function Home() {
  const session = await getServerSession(options);
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const data = res.data;
  // if (!session) {
  //   redirect("/login");
  // }
  // const user = session?.user;
  return (
    <>
      {/* <Navbar /> */}
      {!session ? (
        <LandingPage />
      ) : (
        <Accordion
          type="multiple"
          defaultValue={["item-1", "item-2"]}
          className="w-[700px] mx-auto mt-20 border rounded-lg shadow-lg bg-white p-4"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Server Side</AccordionTrigger>
            <AccordionContent>
              {/* <pre>{JSON.stringify(user, null, 2)}</pre>*/}
              <pre>{JSON.stringify(data.slice(0, 3), null, 2)}</pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Client Side</AccordionTrigger>
            <AccordionContent>
              <User />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}
