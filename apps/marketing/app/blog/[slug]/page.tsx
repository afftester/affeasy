import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeaderT } from "@/components/headert";

interface DocPageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allBlogs.find((doc) => doc.slugAsParams === slug);

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
  };
}

export async function generateStaticParams() {
  return allBlogs.map((doc) => ({
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
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <div className="space-y-1 text-center">
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={doc.date}>
                  {new Date(doc.date).toLocaleDateString("en-CA")}
                </time>
              </dd>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading">
              {doc.title}
            </h1>
            <div className="flex items-center space-x-2 mt-5">
              <Image
                src="https://media.licdn.com/dms/image/C5603AQGUX6HF8Cdhuw/profile-displayphoto-shrink_800_800/0/1571118386704?e=1710374400&v=beta&t=cD29uB8pmR4a3hLXokwrHtGUgkDSblejRBrevBCNiC8"
                width={38}
                height={38}
                alt="avatar"
                className="h-10 w-10 rounded-full"
              />

              <dl className="whitespace-nowrap text-sm font-medium leading-5">
                <dt className="sr-only">Name</dt>
                <Link
                  href="https://www.ritanshudokania.xyz/"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Ritanshu Dokania
                </Link>
              </dl>
            </div>
          </div>
        </section>
      </div>
      <div className="rounded-md bg-[#fbf7ef] m-3 md:m-4 md:rounded-[15px]">
        <section id="features" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto w-full lg:px-10 flex max-w-screen-md flex-col items-center">
            <Mdx code={doc.body.code} />
          </div>
        </section>
      </div>
    </main>
  );
}
