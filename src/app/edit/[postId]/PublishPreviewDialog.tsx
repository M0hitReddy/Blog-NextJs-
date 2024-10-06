import {
  useState,
  useEffect,
  use,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import { X, Image as ImageIcon, Tag, Loader2 } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditorContext } from "@/contexts/editor";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Topic } from "@prisma/client";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import natural from "natural";
import { usePathname, useRouter } from "next/navigation";
interface PreviewDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
interface PreviewData {
  title: string;
  subtitle: string;
  featuredImage: string;
  categories: Category[];
  topics: Topic[];
}
const CATEGORIES = [
  "Technology",
  "Programming",
  "Web Development",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "Mobile Development",
  "UI/UX Design",
  "Business",
  "Entrepreneurship",
  "Marketing",
  "Productivity",
  "Personal Development",
  "Health",
  "Fitness",
  "Travel",
  "Food",
  "Photography",
  "Music",
  "Art",
  "Literature",
  "Education",
];

export default function PublishPreviewDialog({
  isOpen,
  setIsOpen,
}: PreviewDialogProps) {
  const { title, editor } = useEditorContext();
  const session = useSession();
  const postId = usePathname().split("/").pop();
  const router = useRouter();
  const [suggestedCategories, setSuggestedCategories] = useState<Category[]>(
    []
  );
  const[loading, setLoading] = useState(true);
  const [previewData, setPreviewData] = useState<PreviewData>({
    title: title,
    subtitle: "",
    featuredImage: "",
    categories: [] as Category[],
    topics: [] as Topic[],
  });

  useEffect(() => {
    console.log("previewData", previewData.categories);
  }, [previewData.categories]);

  useEffect(() => {
    setPreviewData((prev) => ({ ...prev, title }));
  }, [title]);

  useEffect(() => {
    if(!editor || !isOpen) return;
    async function fetchSuggestedCategories() {
      setLoading(true);
      const text = editor?.getText() ?? "";
      try {
        const res = await axios.post<ApiResponse<Category[]>>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/suggestedCategories`,
          {
            content: text,
          }
        );
        const fetchedSuggestedCategories = res.data.data;
        setSuggestedCategories(fetchedSuggestedCategories);
        setPreviewData((prev) => ({
          ...prev,
          categories: fetchedSuggestedCategories,
        }));
      } catch (error) {
        console.error("Failed to fetch suggested categories:", error);
        setSuggestedCategories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSuggestedCategories();
    const images =
      editor
        ?.getJSON()
        .content?.filter((node) => node.type === "image")
        .map((node) => node.attrs) ?? [];
    setPreviewData((prev) => ({
      ...prev,
      featuredImage: images[0]?.src ?? "",
    }));
  }, [editor,isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreviewData((prev) => ({ ...prev, [name]: value }));
  };

  const removeTopic = (topic: Topic) => {
    setPreviewData((prev) => ({
      ...prev,
      topics: prev.topics.filter((t) =>
        t.id === "" ? t.name !== topic.name : t.id !== topic.id
      ),
    }));
  };

  const handlePublish = async () => {
    // onPublish({ ...previewData, content })
    try {
      const post: Post = {
        id: postId ?? "",
        title: previewData.title,
        subtitle: previewData.subtitle,
        previewImage: previewData.featuredImage,
        topics: previewData.topics,
        categories: suggestedCategories,
        authorId: session.data?.user.id ?? "",
        published: true,
      };
      const res = await axios.put<ApiResponse<string>>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/publish?postId=${postId}`,
        post
      );
      router.push(`/post/${postId}`);
      console.log(res.data.data, "published");

    } catch (error) {
      console.error("Failed to publish post:", error);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w4xl max-w-full h-full flex flex-col p-0">
        <div className="flex-1 flex items-center overflow-hidden container mx-auto ">
          <div className="w-1/2 container p-6 borderr overflow-auto ">
            <div className="sm:max-w-sm md:max-w-md mx-auto space-y-10">
              <DialogTitle className="text-2xl font-bold mb-4 ">
                Story preview
              </DialogTitle>
              {/* <h2 className="text-2xl font-bold mb-4">Story Preview</h2> */}
              <div className="aspect-video relative sm:max-w-sm md:max-w-md mx-auto  bg-gray-100 flex items-center justify-center mb-4">
                {previewData.featuredImage ? (
                  <>
                    {/* <Button
                      variant="outline"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-full bg-transparent backdrop-filter backdrop-blur-md text-primary-foreground"
                    >
                      Change image
                    </Button> */}
                    <ImagesListDialog
                      previewData={previewData}
                      setPreviewData={setPreviewData}
                    />
                    <Image
                      src={previewData.featuredImage}
                      alt="Featured"
                      className="w-full h-full rounded-md  object-cover"
                      width={300}
                      height={180}
                    />
                  </>
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <ImageIcon size={48} />
                    <p className="mt-2 text-sm text-center">
                      Include a high-quality image in your story to make it more
                      inviting to readers.
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="preview-title" className="block">
                  Title
                </Label>
                <Input
                  name="title"
                  id="preview-title"
                  value={previewData.title}
                  onChange={handleInputChange}
                  className="text-3xl mb-5 font-bold  px-0  border-x-0 border-t-0 border-b h-max focus:border-b-primary focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                  placeholder="Your story title"
                />
              </div>
              <div>
                <Label htmlFor="featuredImage" className="block">
                  Subtitle
                </Label>
                <Input
                  name="subtitle"
                  value={previewData.subtitle}
                  onChange={handleInputChange}
                  className="text-xl  border-b border-x-0 border-t-0 px-0 h-max focus:border-b-primary focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                  placeholder="Write a preview subtitle..."
                />
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Note: Changes here will affect how your story appears in public
                places like Medium's homepage and in subscribers' inboxes — not
                the contents of the story itself.
              </p>
            </div>
          </div>

          <Separator className="h-full" orientation="vertical" />
          <div className="w-1/2 p-6 overflow-visible h-full flex flex-col justify-center gap-10">
            <div className="">
              <h2 className="text-2xl font-bold mb-4">
                Publishing to: {session.data?.user.name}
              </h2>
              <Label htmlFor="topics" className="block mb-2">
                Add or change topics (up to 5) so readers know what your story
                is about
              </Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {previewData.topics.map((topic) => (
                  <Badge
                    key={topic.id === "" ? topic.name : topic.id}
                    className="px-2 py-1 text-sm"
                  >
                    {topic.name}
                    <button onClick={() => removeTopic(topic)} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 w-ful sm:w-max-sm md:max-w-md lg:max-w-lg relative">
                {/* <TopicsPopover
                previewData={previewData}
                setPreviewData={setPreviewData}
              /> */}
                <SearchComponent
                  previewData={previewData}
                  setPreviewData={setPreviewData}
                />
              </div>
              <a href="#" className="block mt-4 text-green-600 hover:underline">
                Learn more
              </a>{" "}
              about what happens to your post when you publish.
            </div>

            <div className="space-y-4 h-max">
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Suggested Categories</h2>
              </div>
              <ScrollArea className="h-max pr-4">
                <div className="space-y-4">
                  {loading ? <Loader2 className="animate-spin"/> : suggestedCategories.length ===0 ?<p className="text-muted-foreground">No categories suggested</p>:  suggestedCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={category.id}
                        className="h-5 w-5"
                        onCheckedChange={(checked) => {setPreviewData((prev) => {
                          if (checked) {
                            return { ...prev, categories: [...prev.categories, category] };
                          } else {
                            return { ...prev, categories: prev.categories.filter((c) => c.id !== category.id) };
                          }
                        })}}
                        
                        defaultChecked
                      />
                      <Label
                        htmlFor={category.id}
                        className="text-base font-medium"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <div className="flex gap-4">
            <Button variant="outline">Schedule for later</Button>
            <Button onClick={handlePublish}>Publish now</Button>
          </div>
        </div>
        {/* <SearchComponent /> */}
      </DialogContent>
    </Dialog>
  );
}

interface ImagesListDialogProps {
  previewData: PreviewData;
  setPreviewData: (data: SetStateAction<PreviewData>) => void;
}
function ImagesListDialog({
  previewData,
  setPreviewData,
}: ImagesListDialogProps) {
  const { editor } = useEditorContext();
  const images =
    editor
      ?.getJSON()
      .content?.filter((node) => node.type === "image")
      .map((node) => node.attrs) ?? [];
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button
            variant="outline"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-full bg-transparent backdrop-filter backdrop-blur-sm text-md text-primary-foreground"
          >
            Change image
          </Button>
        </DialogTrigger>

        <DialogContent className="h-2/3 flex flex-col">
          <DialogHeader className="h-max">
            <DialogTitle>Choose an image</DialogTitle>
            <DialogDescription>
              choose an image that appears as preview for your post
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-scree flex-grow mt-2">
            <div className="grid grid-cols-3 gap-3 flex-grow h-full">
              {images.map((image) => (
                <DialogClose
                  className="border"
                  onClick={() => {
                    if (image) {
                      setPreviewData((prev) => ({
                        ...prev,
                        featuredImage: image.src,
                      }));
                    }
                  }}
                >
                  <Image
                    src={image?.src}
                    alt="Image"
                    width={300}
                    height={180}
                    className="w-full h-full aspect-square object-cover hover:opacity-50"
                  />
                </DialogClose>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface TopicsPopoverProps {
  previewData: PreviewData;
  setPreviewData: (data: SetStateAction<PreviewData>) => void;
}

const SearchComponent = ({
  previewData,
  setPreviewData,
}: TopicsPopoverProps) => {
  const [topicInput, setTopicInput] = useState("");
  const [suggestions, setSuggestions] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.length < 1) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        // Replace this with your actual API call
        const response = await axios<ApiResponse<Topic[]>>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/topics?query=${query}`
        );
        const topics = response.data.data;
        setSuggestions(topics);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(topicInput);
  }, [topicInput, fetchSuggestions]);

  const handleAddTopic = () => {
    if (
      topicInput &&
      !previewData.topics.map((topic) => topic.name).includes(topicInput) &&
      previewData.topics.length < 5
    ) {
      setPreviewData((prev) => ({
        ...prev,
        topics: [...prev.topics, { id: "", name: topicInput }],
      }));
      setTopicInput("");
    }
  };

  const handleSelect = (selectedItem: Topic) => {
    setPreviewData((prev) => ({
      ...prev,
      topics: [...prev.topics, selectedItem],
    }));
    setTopicInput("");
  };

  return (
    <div className="flex gap-2 items-center w-full ">
      <Command className="shadow-md shadow-secondary  overflow-visible rounded-full">
        <CommandInput
          placeholder="Add a topic..."
          value={topicInput}
          onValueChange={setTopicInput}
          className=" rounded-full"
          // onKeyDown={(e) => {
          //   if (e.key === "Enter" &&suggestions.length === 0) {
          //     // if (suggestions.length > 0) {
          //       handleSelect(topicInput);
          //       // }
          //     }
          //   }}
          // icon={<Search className="h-4 w-4" />}
        />
        {
          <CommandList
            className={cn(
              "absolute z-10 top-14 min-w-40 w-max bg-background shadow-muted shadow-md",
              !(suggestions.length > 0) && "hidden"
            )}
          >
            {/* <CommandEmpty>No results found.</CommandEmpty> */}
            {/* <CommandGroup heading="Suggestions"> */}
            <CommandItem className="hidden">dummy</CommandItem>
            {suggestions.map((item) => (
              <CommandItem
                key={item.id}
                disabled={
                  isLoading ||
                  previewData.topics.includes(item) ||
                  previewData.topics.length >= 5
                }
                onSelect={() => handleSelect(item)}
              >
                {item.name}
              </CommandItem>
            ))}
            {/* </CommandGroup> */}
          </CommandList>
        }
      </Command>
      <Button
        className="h-full rounded-full px-6"
        disabled={
          isLoading ||
          previewData.topics.map((topic) => topic.name).includes(topicInput) ||
          previewData.topics.length >= 5
        }
        onClick={handleAddTopic}
      >
        Add
      </Button>
    </div>
  );
};
