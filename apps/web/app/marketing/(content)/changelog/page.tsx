"use client";
import { allChangelogs } from "contentlayer/generated";

import { Mdx } from "../../_components/mdx";
import { Shell } from "../../_components/shell";
import { Timeline } from "../../_components/timeline";

export default async function Changelog() {
  const changelogs = allChangelogs.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <Shell>
      <Timeline
        title="Changelog"
        description="All the latest features, fixes and work to OpenStatus."
      >
        {changelogs.map((changelog) => (
          <Timeline.Article
            key={changelog.slug}
            publishedAt={changelog.publishedAt}
            imageSrc={changelog.image}
            title={changelog.title}
            href={`./changelog/${changelog.slug}`}
          >
            <Mdx code={changelog.body.code} />
          </Timeline.Article>
        ))}
      </Timeline>
    </Shell>
  );
}
