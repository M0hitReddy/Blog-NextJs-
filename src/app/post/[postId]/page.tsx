// "use client";

import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { useRouter } from "next/router";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
// import Link from "@tiptap/extension-link";
// import CodeBlock from "@tiptap/extension-code-block";
// import Underline from "@tiptap/extension-underline";
// import TiptapImage from "@tiptap/extension-image";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";


const fetchPost = async (postId: string) => {
  try {
    const res = await axios.get<ApiResponse<Post>>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post?postId=${postId}`
    );
    const post = res.data.data;
    const content = JSON.parse(post?.content ?? "");
    // console.log(content, "content");
    // console.log(res.data.data, "post");
    return {
      ...post,
      type: "doc",
      content: content.content,
    };
  
    // setPost(res.data.data);
    // editor?.commands.setContent(JSON.parse(content ?? ""));
  } catch (error) {
    console.error("Error fetching post:", error);
  }
};

export default async function Post({ params }: { params: { postId: string } }) {
  const postId = params.postId;
  // const [post, setPost] = useState<Post | null>(null);
  
  // const editor = getEditor();
  // useEffect(() => {
    // if (!postId) return;
    

    const post = await fetchPost(postId);
    // console.log(post?.content, "post?.content");
  // }, [postId, editor]);

  return (
    <>
      <div className="mx-auto w-full sm:max-w-3xl px-2 bg-">
        <div className="container mx-auto px-4 py-6 flex">
          {/* Main Content */}
          <main className="flex-1 max-w-3xl">
            <div className="space-y-6">
              <div>
                {/* <Input
                type="text"
                placeholder="Enter a catchy title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-4xl bg-transparent font-semibold border-x-0 border-t-0 px-0 pb-4 h-max focus:border-b-primary focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
              /> */}
                {post?.title && <p className="text-4xl bg-transparent font-semibold border-b px-0 pb-4 h-max">
                  {post?.title}
                </p>}
                {/* <div className="text-sm text-muted-foreground mt-2">
                Write a catchy title for your blog post
              </div> */}
              </div>
              {/* <Separator /> */}
              <article className="[&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:focus:ring-0 prose lg:prose-xl text-xl tracking-[1px] break-word text-primary font-[Lora]">
                {/* <MenuBar editor={editor}/> */}
                {/* <EditorContent
                  editor={editor}
                  className="prose font-[Lora] max-w-none border-0 focus:border-0 focus:outline-dotted text-2xl"
                /> */}
                {post?.content && renderContent(post.content)}
              </article>
            </div>
            {(post?.topics?.length ?? 0) > 0 &&
              <>
                <Separator className="my-6" />
                <div className="space-y-2">
                  <h4 className="text-base ml-1">Topics</h4>
                  <div className="flex flex-wrap">
                    {post?.topics?.map((topic) => (
                      <div
                        key={topic.id}
                        className="bg-muted-foreground text-primary-foreground text-l px-4 py-1 rounded-full mr-2 mb-2"
                      >
                        {topic.name}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            }
          </main>
        </div>
      </div>
    </>
  );
}

function renderContent(content: any[]): React.ReactNode {
  if (!content || !Array.isArray(content)) {
    return null; // or return a fallback UI
  }
  // console.log(content, "content");
  return content.map((item, index) => {
    switch (item.type) {
      case 'paragraph':
        return <p className="text-xl" key={index}>{renderContent(item.content)}</p>;
      case 'text':
        if (item.marks) {
          return item.marks.reduce((acc: React.ReactNode, mark: any) => {
            switch (mark.type) {
              case 'bold':
                return <strong key={index}>{acc}</strong>;
              case 'italic':
                return <em key={index}>{acc}</em>;
              case 'underline':
                return <u key={index}>{acc}</u>;
              case 'link':
                return <Link key={index} href={mark.attrs.href}>{acc}</Link>;
              default:
                return acc;
            }
          }, item.text);
        }
        return item.text;
      case 'image':
        return (
          <Image 
            key={index}
            src={item.attrs.src} 
            alt={item.attrs.alt || ''} 
            width={500} 
            height={300} 
            style={{width: '100%', height: 'auto'}}
          />
        );
      case 'heading':
        const HeadingTag = `h${item.attrs.level}` as keyof JSX.IntrinsicElements;
        return <HeadingTag key={index}>{renderContent(item.content)}</HeadingTag>;
      case 'horizontalRule':
        return <hr key={index} />;
      case 'codeBlock':
        return <pre key={index}><code>{item.content[0].text}</code></pre>;
      default:
        console.warn(`Unhandled content type: ${item.type}`);
        return null;
    }
  });
}



// function getEditor() {
//   const editor = useEditor({
//     extensions: [
//       Link.configure({
//         HTMLAttributes: {
//           class: "text-primary",
//         },
//         // openOnClick: false,
//         // linkOnPaste: true,
//       }),
//       StarterKit.configure({
//         codeBlock: false,
//       }),
//       Image,
//       Underline,
//       CodeBlock,
//     ],
//     content: "", // This is the JSON from the database
//     editorProps: {
//       attributes: {
//         class:
//           "prose max-w-none focus:outline-none text-xl tracking-[1px] break-word leading- text-primary",
//       },
//     },
//     immediatelyRender: false,
//     editable: false, // Make the content read-only
//   });
//   return editor;
// }