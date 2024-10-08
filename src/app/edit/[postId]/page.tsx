"use client";

import { useEffect, useState } from "react";
import BlogEditor from "../../components/BlogEditor";
import { useEditorContext } from "@/contexts/editor";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Post } from "@/types/schemas";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
// import { useToast } from "@/hooks/use-toast";

export default function Edit() {
  const { setEditor, setTitle } = useEditorContext();
  const router = useRouter();
  const session =useSession();
  const path = usePathname();
  const postId = path.split("/").pop();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const { toast } = useToast();
  // get search params
  // const searchParams = useSearchParams();
  const newEditor = useEditor({
    extensions: [
      Link.configure({
        HTMLAttributes: {
          class: "text-primary",
        },
        // openOnClick: false,
        // linkOnPaste: true,
      }),
      StarterKit.configure({
        codeBlock: false,
      }),
      Image,
      Underline,
      CodeBlock,
    ],
    content: "<p>Start writing your blog post here...</p>",
    editorProps: {
      attributes: {
        class:
          "prose max-w-none focus:outline-none text-xl tracking-[1px] break-word leading- text-primary",
      },
    },
    immediatelyRender: false,
  });

  // newEditor?.commands.setContent

  useEffect(() => {
    // const saveDraft = searchParams.get("saveDraft");
    if(session.status === "loading") return;
    const fetchPost = async () => {
      try {
        const response = await axios.get<ApiResponse<Post>>(
          `/api/post?postId=${postId}`
        );
        const post = response.data.data;
        console.log(post.author, session);
        if(post.author?.id !== session.data?.user.id) {
          
          router.push(`/post/${postId}`);
          return;
        }
        setPost(post);
        // setEditor(post.content);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    // if (saveDraft === "true")
    //   toast({
    //     title: "Draft saved!",
    //     description: "Your blog post has been successfully saved as a draft.",
    //     variant: "default",
    //   });
  }, [path, postId, session.status, router, session]);

  useEffect(() => {
    if (!post) return;
    const postContent = JSON.parse(post?.content || "");
    console.log(postContent);
    newEditor && newEditor.commands.setContent(postContent || "");
    setTitle(post.title);
    setEditor(newEditor);
  }, [post, newEditor, setEditor, setTitle, router, session]);

  useEffect(() => {
    if (path.startsWith("/edit")) {
      // Fetch the post data from the backend
    }
  }, [path]);

  return (
    <>
      {loading ? (
          <Loader2 className="animate-spin w-12 h-12 m-auto mt-20"/>
      ) : (
        <BlogEditor />
      )}
    </>
  );
}
