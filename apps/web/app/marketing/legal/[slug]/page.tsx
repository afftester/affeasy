import { allLegalPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

import { Mdx } from "../../_components/mdx";
import { Shell } from "../../_components/shell";

// export const dynamic = "force-static";

export async function generateStaticParams() {
  return allLegalPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allLegalPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // TODO: add author.avatar and author.url
  return (
    <>
      <Shell className="sm:py-8 md:py-12">
        <article className="grid gap-8">
          <div className="mx-auto grid w-full max-w-prose gap-3">
            <h1 className="font-cal mb-5 text-3xl">{post.title}</h1>
          </div>
          <div className="mx-auto max-w-prose">
            <Mdx code={post.body.code} />
          </div>
        </article>
      </Shell>
    </>
  );
}
