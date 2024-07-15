import type { Post } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

import { Avatar } from "@dub/ui";

import { formatDate } from "@dub/utils";
import { Mdx } from "./mdx";

export function Article({ post }: { post: Post }) {
  const getNameInitials = (name: string) => {
    const individualNames = name.split(" ");
    return (
      individualNames[0][0] + individualNames[individualNames.length - 1][0]
    );
  };

  return (
    <article className="relative mx-auto flex max-w-prose flex-col gap-8">
      <div className="grid w-full gap-3">
        <h1 className="font-cal mb-5 text-3xl">{post.title}</h1>
        <div className="border-border relative h-64 w-full overflow-hidden rounded-lg border">
          <Image
            src={post.image}
            fill={true}
            alt={post.title}
            className="object-cover"
          />
        </div>
        <div className="flex items-center gap-3">
          <Avatar user={post.author} />
          <div className="text-muted-foreground text-sm font-light">
            <Link
              href={post.author.url ?? "#"}
              target="_blank"
              className="text-foreground cursor-pointer font-medium hover:underline"
            >
              {post.author.name}
            </Link>
            <p>{formatDate(post.publishedAt)}</p>
          </div>
        </div>
      </div>
      <Mdx code={post.body.code} />
    </article>
  );
}
