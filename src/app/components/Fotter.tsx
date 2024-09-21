"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Fotter() {
  const path = usePathname();

  return path !== "new" ? null : (
    <footer className="mt-auto py-6 w-full shrink-0 absolut bottom-0 border-t">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © 2023 BlogApp Inc. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
