"use client";

import { useEffect } from "react";
import BlogEditor from "../components/BlogEditor";
import { useEditorContext } from "@/contexts/editor";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";

export default function New() {
  const { setEditor, setTitle } = useEditorContext();
  const newEditor = useEditor({
    extensions: [
      Link.configure({
        // openOnClick: false,
        // linkOnPaste: true,
      }),
      StarterKit.configure({
        codeBlock: false,
      }),
      Image.configure({ HTMLAttributes: { class: "w-full" } }),
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

  useEffect(() => {
    if (newEditor) {
      setTitle("");
      setEditor(newEditor);
    }
  }, [newEditor]);

  return (
    <>
      <BlogEditor />
    </>
  );
}
