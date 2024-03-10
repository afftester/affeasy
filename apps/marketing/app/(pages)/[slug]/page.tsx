import { notFound } from "next/navigation";
import { allPages } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import type { Metadata } from "next";

import { HeaderT } from "@/components/headert";
interface DocPageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allPages.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    notFound();
  }

  return doc;
}

async function generateMetadata(slug: string): Promise<Metadata> {
  const doc = await getDocFromParams(slug);

  if (!doc) {
    return { title: "", description: "" };
  }

  return {
    title: doc.title || "",
    description: doc.description || "Default description here",
  };
}

export async function generateStaticParams() {
  return allPages.map((doc) => ({
    slug: doc.slugAsParams,
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params.slug);

  // Assuming the metadata is set elsewhere in the framework using the generateMetadata function
  return (
    <main>
      <div className="rounded-md bg-gradient-to-br from-[#FBD7FF] via-[#FEDCD6] to-[#FFDEC2] m-3 md:m-4 md:rounded-[15px]">
        <HeaderT />
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading">
              {doc.title}
            </h1>
          </div>
        </section>
      </div>
      <div className="rounded-md bg-[#fbf7ef] m-3 md:m-4 md:rounded-[15px]">
        <section
          id="features"
          className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto w-full lg:px-10 flex max-w-screen-md flex-col items-center">
            <Mdx code={doc.body.code} />
          </div>
        </section>
      </div>
    </main>
  );
}
