import Link from "next/link";

export function BrandName() {
  return (
    <Link
      href="https://affeasy.link/"
      className="font-heading text-muted-foreground hover:text-foreground text-lg"
    >
      AffEasy
    </Link>
  );
}
