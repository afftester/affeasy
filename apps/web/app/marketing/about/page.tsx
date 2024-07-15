import { allUnrelateds } from "contentlayer/generated";
import { Mdx } from "../_components/mdx";
import { Shell } from "../_components/shell";
import { MarketingLayout } from "../marketing-components/marketing-layout";
import type { MemberProps } from "./_components/member";
import { Member } from "./_components/member";

const story = allUnrelateds.find((unrelated) => unrelated.slug === "our-story");

export default function AboutPage() {
  return (
    <MarketingLayout>
      <div className="my-8 w-full">
        <h1 className="text-foreground mb-8 text-4xl font-bold">
          About AffEasy
        </h1>
        <div className="text-muted-foreground mb-12 max-w-3xl">
          <p>
            AffEasy is on a mission to provide a{" "}
            <span className="text-foreground font-medium">reliable</span>,{" "}
            <span className="text-foreground font-medium">easy</span> and{" "}
            <span className="text-foreground font-medium">fast</span> way to
            create affiliate links.
          </p>
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="mr-20 md:mr-0 md:w-1/4">
            <Member {...members[0]} />
          </div>
          <div className="md:w-3/4">
            <Shell className="dark:border-card-foreground/30 w-auto shadow sm:px-8 sm:py-8 md:px-12 md:py-12">
              {story ? (
                <Mdx
                  code={story.body.code}
                  className="sm:prose-lg prose-li:my-0"
                />
              ) : null}
            </Shell>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}

const members: MemberProps[] = [
  {
    name: "Ritanshu Dokania",
    role: "Main Man",
    image: { src: "/ritanshu.webp" },
    socials: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ritanshudokania/",
        icon: "linkedin",
      },
    ],
  },
];
