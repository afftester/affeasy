import { allPosts } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Article } from "../../../_components/article";
import { BackButton } from "../../../_components/back-button";
import { Shell } from "../../../_components/shell";

// export const dynamic = "force-static";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | void> {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }
  const { title, publishedAt: publishedTime, description, slug, image } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://www.affeasy.link/blog/${slug}`,
      images: [
        {
          url: `https://www.affeasy.link/_static/posts/${slug}.webp`,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [`https://www.affeasy.link/_static/posts/${slug}.webp`],
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BackButton href="/blog" />
      <Shell className="sm:py-8 md:py-12">
        <Article post={post} />
      </Shell>
    </>
  );
}
