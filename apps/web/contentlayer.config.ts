import { makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { Changelog } from "./contentlayer/documents/changelog";
import { FAQ } from "./contentlayer/documents/faq";
import { LegalPost } from "./contentlayer/documents/legal";
import { Post } from "./contentlayer/documents/post";
import { Unrelated } from "./contentlayer/documents/unrelated";
import autolinkHeadings from "./contentlayer/plugins/autolink-headings";
import prettyCode from "./contentlayer/plugins/pretty-code";

export default makeSource({
  contentDirPath: "./content/",
  documentTypes: [Post, LegalPost, Changelog, FAQ, Unrelated],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, prettyCode, autolinkHeadings],
  },
});
