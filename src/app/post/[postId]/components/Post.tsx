// import { Input } from "@/components/ui/input";
// import { ApiResponse } from "@/types/ApiResponse";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { useEditorContext } from "@/contexts/editor";

// // import { usePathname } from "next/navigation";
// // import { use } from "react";

// export default async function Post({ postId }:  { postId: string }) {
//     // const router = useRouter();
//     // const postId = router.query.postId as string;
//     const res = await axios.get<ApiResponse<Post>>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post?postId=${postId}`);
//     const post = res.data.data;
//     const editor = useEditor({
//         extensions: [StarterKit],
//         content: post.content,  // This is the JSON from the database
//         editable: false,    // Make the content read-only
//       })
//     //   const{editor, setEditor} = useEditorContext();
//   return (
//     <>
//       <div className="mx-auto w-full sm:max-w-3xl px-2 bg-">
//         <div className="container mx-auto px-4 py-6 flex">
//           {/* Main Content */}
//           <main className="flex-1 max-w-3xl">
//             <div className="space-y-6">
//               <div>
//                 {/* <Input
//                   type="text"
//                   placeholder="Enter a catchy title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="text-4xl bg-transparent font-semibold border-x-0 border-t-0 px-0 pb-4 h-max focus:border-b-primary focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
//                 /> */}
//                 <p className="text-4xl bg-transparent font-semibold border-x-0 border-t-0 px-0 pb-4 h-max">
//                     {post.title}
//                 </p>
//                 {/* <div className="text-sm text-muted-foreground mt-2">
//                 Write a catchy title for your blog post
//               </div> */}
//               </div>
//               {/* <Separator /> */}
//               <div className="[&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:focus:ring-0">
//               <EditorContent editor={editor} />
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }
