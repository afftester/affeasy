import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const pathname = usePathname();
  // Remove leading and trailing slashes, then split
  const pathSegments = pathname.replace(/^\/|\/$/g, "").split("/");
  const basePath = pathSegments[0] === "page" ? "" : `/${pathSegments[0]}`;

  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  const getHref = (page: number) => {
    // Check if we are at the root ('/')
    if (pathname === "/") {
      return page === 1 ? "/" : `/page/${page}`;
    } else {
      return page === 1 ? `${basePath}/` : `${basePath}/page/${page}`;
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 space-x-2">
      <Link
        className={cn(currentPage === 1 ? "pointer-events-none" : "")}
        href={getHref(currentPage - 1)}
      >
        <Button
          variant="outline"
          className={cn("h-8 w-8 p-0", !prevPage && "opacity-50")}
          disabled={!prevPage}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
      </Link>

      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {currentPage} of {totalPages}
      </div>

      <Link
        className={cn(currentPage >= totalPages ? "pointer-events-none" : "")}
        href={getHref(currentPage + 1)}
      >
        <Button
          variant="outline"
          className={cn("h-8 w-8 p-0", !nextPage && "opacity-50")}
          disabled={!nextPage}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
