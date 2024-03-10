import { allBlogs } from "contentlayer/generated";
import BlogList from "@/components/BlogList";
import { Blog } from "contentlayer/generated";
import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";

const POSTS_PER_PAGE = 5;
export const revalidate = 10800;

const sortPostsByDate = (posts: Blog[]): Blog[] => {
  return posts.sort(
    (a: Blog, b: Blog) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const generateStaticParams = () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));

  return paths;
};

export default function Page({ params }: { params: { page: string } }) {
  // Assuming allDeals is your array of deals. Sort them if necessary
  const sortedPosts = sortPostsByDate(allBlogs); // Replace with sortDeals(allDeals) if you have a sorting function
  const pageNumber = parseInt(params.page as string); // Set the current page number. This might come from router query in a real scenario

  // Calculate the subset of deals to be displayed on the current page
  const initialDisplayDeals = sortedPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );

  // Calculate pagination details
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(sortedPosts.length / POSTS_PER_PAGE),
  };
  return (
    <>
      <div className="rounded-md bg-gradient-to-br from-[#FBD7FF] via-[#FEDCD6] to-[#FFDEC2] m-3 md:m-4 md:rounded-[15px]">
        <header className="container z-10 md:py-8 p-3 md:px-24">
          <div className="rounded-md bg-white p-3 drop-shadow-md">
            <MainNav items={siteConfig.mainNav} />
          </div>
        </header>
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading">
              Blog
            </h1>
          </div>
        </section>
      </div>
      <div className="rounded-md bg-[#F4F4F4] m-3 md:m-4 md:rounded-[15px]">
        <section id="features" className="container py-8 max-w-[64rem]">
          <div className="flex flex-col">
            <BlogList
              posts={sortedPosts}
              initialDisplayPosts={initialDisplayDeals}
              pagination={pagination}
            />
          </div>
        </section>
      </div>
    </>
  );
}
