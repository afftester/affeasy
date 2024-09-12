import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@dub/ui";

const Questions = [
  {
    title: "What is AffEasy?",
    content: `AffEasy is the ultimate powerhouse for affiliate marketers, designed to simplify your link creation process across multiple networks. With AffEasy, you can create affiliate links from various networks in one centralized hub, accessing major platforms like CJ, Rakuten, PlanetHowl, Amazon, and more.\n\nLearn more [here](https://docs.affeasy.link/introduction)`,
  },
  {
    title: "How does it work?",
    content: `After creating your account, you'll provide your account details for various affiliate networks, connecting AffEasy to your partnerships. When you're ready to generate an affiliate link, simply paste the product URL (for example, a Nike product link) into our portal. AffEasy's intelligent system then automatically detects which affiliate network you're partnered with for that specific brand.\n\nOur advanced algorithm communicates with the appropriate network to generate your unique affiliate link instantly. \n\nLearn more [here](https://docs.affeasy.link/how-it-works)`,
  },
];

const parseContent = (content) => {
  const parts = content.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, index) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      return (
        <a key={index} href={match[2]} className="underline">
          {match[1]}
        </a>
      );
    }
    return part;
  });
};

export const FAQ = () => {
  return (
    <div className="mt-10 w-full px-3 py-4 md:my-20">
      <h3 className="text-left text-2xl font-semibold md:text-3xl">
        Frequently Asked Questions
      </h3>
      <div className="my-10">
        <Accordion collapsible type="single">
          {Questions.map(({ title, content }) => (
            <AccordionItem key={title} value={title}>
              <AccordionTrigger className="text-left">{title}</AccordionTrigger>
              <AccordionContent>
                {content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-2 text-left">
                    {parseContent(paragraph)}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
