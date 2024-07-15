"use client";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";

import { MarketingButton as Button } from "@dub/ui/src/button-marketing";

import { Shell } from "../../_components/shell";
import { Timeline } from "../../_components/timeline";

export default async function Post() {
  const posts = allPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <Shell>
      <Timeline
        title="Blog"
        description="All the latest articles and news from OpenStatus."
      >
        {posts.map((post) => (
          <Timeline.Article
            key={post.slug}
            publishedAt={post.publishedAt}
            imageSrc={post.image}
            title={post.title}
            href={`./blog/${post.slug}`}
          >
            <div className="prose dark:prose-invert">
              <p>{post.description}</p>
            </div>
            <div>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href={`./blog/${post.slug}`}>Read more</Link>
              </Button>
            </div>
          </Timeline.Article>
        ))}
      </Timeline>
    </Shell>
  );
}
