"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types/schemas";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CategoryLink({ category }: { category: Category }) {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get("category") || "all";

  // const handleCategoryClick = () => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("category", category.id.toString());
  //   router.push(category.id === "all" ? "/" : `?${params.toString()}`);
  // };

  return (
    <Link
      href={category.id === "all" ? "/" : `/?category=${category.id}`}
      className={cn(
        "px-3 py-4 border-b hover:text-primary text-base",
        activeCategoryId === category.id
          ? "text-primary border-b-primary"
          : "text-muted-foreground"
      )}
    >
      {category.name}
    </Link>
  );
}
