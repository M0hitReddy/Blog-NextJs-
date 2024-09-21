"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/components/ui//t"
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronDown,
  Home,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Toaster } from "@/components/ui/toaster";

export default function BlogEditorPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  // const handlePublish = async () => {
  //   // Here you would typically send the data to your backend
  //   toast({
  //     title: "Blog post published!",
  //     description: "Your blog post has been successfully saved and published.",
  //     variant:"default"
  //   });
  // };

  return (
    <main className="flex-gro h-ful w-full sm:max-w-3xl px-2  mx-auto flex flex-col space-y-6 border2 border-black mt-">
      <Toaster />
      {/* <div className="flex justify-end space-x-4 mt-auto">
        <Button variant="outline">Save Draft</Button>
        <Button onClick={handlePublish}>Publish</Button>
      </div> */}
      <div>
        <Input
          type="text"
          placeholder="Enter your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-bold border-0 px-0 ring-0 focus-visible:ring-0"
        />
        <div className="text-sm text-muted-foreground mt-2">
          Write a catchy title for your blog post
        </div>
      </div>
      <div className="flex-grow">
        <Textarea
          ref={textareaRef}
          placeholder="Write your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-gro h-auto min-h-full text-lg resize-none border-none p-0 focus-visible:ring-0"
        />
      </div>
    </main>
  );
}
