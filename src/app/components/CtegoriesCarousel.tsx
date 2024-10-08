// "use client";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import Link from "next/link";
import CategoryLink from "./CategoryLink";
import { Category } from "@/types/schemas";

export default async function CategoryCarousel({
  className,
}: {
  className?: string;
}) {
  const res = await axios.get<ApiResponse<Category[]>>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
  );
  const categories: Category[] = [{ id: "all", name: "All" }, ...res.data.data];

  return (
    <Card className={cn(" border-0 shadow-none", className)}>
      <CardContent className="p-0">
        <Carousel>
          <CarouselContent className="py-0 px-6">
            {categories.map((category) => (
              <CarouselItem key={category.id} className="basis-auto px-0 py-4">
                <CategoryLink category={category} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-0 -left-4 bg-transparent" />
          <CarouselNext className="border-0 -right-4" bg-transparent/>
        </Carousel>
      </CardContent>
    </Card>
  );
}
