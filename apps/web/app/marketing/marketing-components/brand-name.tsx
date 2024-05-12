import * as React from "react";
import Link from "next/link";

// Hottake: you don't need a features page if you have a changelog page
// Except for SEO

export function BrandName() {
  return (
    <Link
      href="/"
      className="font-cal text-muted-foreground hover:text-foreground text-lg"
    >
      AffEasy
    </Link>
  );
}
