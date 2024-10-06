"use client";

import { use, useEffect, useState } from "react";
import BlogEditor from "../../components/BlogEditor";
import { useEditorContext } from "@/contexts/editor";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/hooks/use-toast";

export default function Edit() {
  const { editor, setEditor, title, setTitle } = useEditorContext();
  const path = usePathname();
  const postId = path.split("/").pop();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  // get search params
  const searchParams = useSearchParams();
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

    const fetchPost = async () => {
      try {
        const response = await axios.get<ApiResponse<Post>>(
          `/api/post?postId=${postId}`
        );
        const post = response.data.data;
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
  }, [path]);

  useEffect(() => {
    if (!post) return;
    const postContent = JSON.parse(post?.content || "");
    console.log(postContent);
    newEditor && newEditor.commands.setContent(postContent || "");
    setTitle(post.title);
    setEditor(newEditor);
  }, [post]);

  useEffect(() => {
    if (path.startsWith("/edit")) {
      // Fetch the post data from the backend
    }
  }, [path]);

  return (
    <>
      <BlogEditor />
    </>
  );
}
