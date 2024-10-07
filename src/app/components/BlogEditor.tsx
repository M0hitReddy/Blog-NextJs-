"use client";

import { useEffect, useState } from "react";
import { EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  UnderlineIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Image as ImageIcon,
  Minus,
  
  Code,
  Loader2,
  LinkIcon,
} from "lucide-react";
// import lowlight from 'lowlight'
// import Underline from "@tiptap/extension-underline";
// import CodeBlock from "@tiptap/extension-code-block";
// import Link from "@tiptap/extension-link";
import { Editor } from "@tiptap/react";
// import { useToast } from "@/hooks/use-toast";
import useUpload from "@/hooks/use-upload";
import { Label } from "@/components/ui/label";
import { useEditorContext } from "@/contexts/editor";
// import { Separator } from "@/components/ui/separator";


const LinkDialog = ({ editor, isOpen, setIsOpen }: { editor: Editor, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
  const [url, setUrl] = useState('')
  const [linkText, setLinkText] = useState('')

  const addLink = () => {
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
      
      if (linkText && editor.state.selection.empty) {
        editor.chain().focus().insertContent(linkText).run()
        editor.chain().focus().setLink({ href: url }).run()
      }
    }
    setIsOpen(false)
    setUrl('')
    setLinkText('')
    editor.commands.focus("end")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="icon"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="url" className="">
              URL
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="linkText" className="">
              Link Text
            </Label>
            <Input
              id="linkText"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={addLink}>Add Link</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [url, setUrl] = useState<string | null>(null);
  const { loading, imageUrl, handleFileUpload, handleImageUrl } =
    useUpload();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState<boolean>(false);

//  const addLink = () => {
//     const url = window.prompt("URL");
//     if (url && editor) {
//       editor.chain().focus().setLink({ href: url }).run();
//     }
//   };
  useEffect(() => {
    if (editor && imageUrl)
      editor.chain().focus().setImage({ src: imageUrl }).run();
    setDialogOpen(false);
  }, [imageUrl, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4  sticky top-0 z-10  backdrop-blur-[8px]  justify-between shadowxl p-2 ">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "secondary" : "outline"}
        size="icon"
        className="hover:scale-105 duration-200"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "secondary" : "outline"}
        size="icon"
        className="hover:scale-105 duration-200"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        variant={editor.isActive("underline") ? "secondary" : "outline"}
        size="icon"
        className="hover:scale-105 duration-200"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={
          editor.isActive("heading", { level: 1 }) ? "secondary" : "outline"
        }
        size="icon"
        className="hover:scale-105 duration-200"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={
          editor.isActive("heading", { level: 2 }) ? "secondary" : "outline"
        }
        size="icon"
        className="hover:scale-105 duration-200"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive("bulletList") ? "secondary" : "outline"}
        size="icon"
        className="hover:scale-105 duration-200"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        variant={editor.isActive("orderedList") ? "secondary" : "outline"}
        size="icon"
        className="hover:scale-105 duration-200"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        variant="outline"
        size="icon"
        className="hover:scale-105 duration-200"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
          <Button
            
            variant="outline"
            size="icon"
            className="hover:scale-105 duration-200"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin" />
              uploading..
            </div>
          ) : (
            <div>
              <Label htmlFor="image-url">Paste image url</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="text"
                  className="rounded-full"
                  id="image-url"
                  placeholder="https://elampleimage.img.in"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url || ""}
                />
                <Button
                className="rounded-full"
                  onClick={async () => {
                    await handleImageUrl(url || "");
                    // if (imageUrl) {
                    //   editor.chain().focus().setImage({ src: imageUrl }).run();
                    // }
                  }}
                >
                  Insert
                </Button>
              </div>
              <p className="text-center my-3">or</p>
              <Label htmlFor="image-file">Upload image</Label>
              <Input
                type="file"
                id="image-file"
                className="mt-1 rounded-full border-primary"
                // ref={fileInputRef}
                // accept="image/*"
                onChange={async (e) => {
                  await handleFileUpload(e);
                  // setDialogOpen(false);
                  // if (imageUrl) {
                  //   editor.chain().focus().setImage({ src: imageUrl }).run();
                  // }
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        variant={editor.isActive("codeBlock") ? "secondary" : "outline"}
        size="icon"
        className="hover:scale-105 duration-200"
      >
        <Code className="h-4 w-4" />
      </Button>
      <LinkDialog 
        editor={editor} 
        isOpen={isLinkDialogOpen} 
        setIsOpen={setIsLinkDialogOpen} 
      />
    </div>
  );
};

export default function BlogEditor() {
  // const { toast } = useToast();
  const {editor, title, setTitle} = useEditorContext();
  

  // useEffect(() => {
  //   if (editor) {
  //     editor.setOptions({
  //       editorProps: {
  //         attributes: {
  //           class:
  //             "prose max-w-none focus:outline-none leading-relaxed text-xl tracking-[wide] text-primary",
  //         },
  //       },
  //     });
  //   }
  // }, [editor]);

  // useEffect(() => {
  //   console.log("Editor is ready to use", editor?.getText());
  // }, [title]);

  // const handlePublish = async () => {
  //   const content = editor?.getHTML() || "";
  //   console.log("Title:", title);
  //   console.log("Content:", content);
  //   // Here you would typically send the data to your backend
  //   // For this example, we'll just log it to the console
  // };

  // const handlePublish = async () => {
  //   // Here you would typically send the data to your backend
  //   toast({
  //     title: "Blog post published!",
  //     description: "Your blog post has been successfully saved and published.",
  //     variant: "default",
  //   });
  // };

  return (
    <div className="mx-auto w-full sm:max-w-3xl px-2 bg-">
      
      <div className="container mx-auto px-4 py-6 flex">
        {/* Main Content */}
        <main className="flex-1 max-w-3xl">
          <div className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Enter a catchy title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-4xl bg-transparent font-semibold border-x-0 border-t-0 px-0 pb-4 h-max focus:border-b-primary focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
              />
              {/* <div className="text-sm text-muted-foreground mt-2">
                Write a catchy title for your blog post
              </div> */}
            </div>
            {/* <Separator /> */}
            <div className="[&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:focus:ring-0">
              <MenuBar editor={editor}/>
              <EditorContent
                editor={editor}
                className="prose font-[Lora] max-w-none border-0 focus:border-0 focus:outline-dotted text-2xl"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
