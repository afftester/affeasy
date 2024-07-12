import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@dub/ui";

const Questions = [
  {
    title: "What is AffEasy?",
    content: `AffEasy is the ultimate powerhouse for affiliate marketers, designed to simplify your link creation process across multiple networks. With AffEasy, you can create affiliate links from various networks in one centralized hub, accessing major platforms like CJ, Rakuten, PlanetHowl, Amazon, and more.\n\nOur platform also offers built-in link-shortening for cleaner, more professional-looking URLs, and provides integrated link analytics to track your performance effectively.`,
  },
  {
    title: "How does it work?",
    content: `After creating your account, you'll provide your account details for various affiliate networks, connecting AffEasy to your partnerships. When you're ready to generate an affiliate link, simply paste the product URL (for example, a Nike product link) into our portal. AffEasy's intelligent system then automatically detects which affiliate network you're partnered with for that specific brand.\n\nOur advanced algorithm communicates with the appropriate network to generate your unique affiliate link instantly. This automated process eliminates the need to navigate multiple platforms manually, saving you time and reducing potential errors.`,
  },
  {
    title: "What are the advantages of the premium plan?",
    content: `The Premium Plan takes your affiliate marketing efforts to the next level by offering a suite of advanced features and benefits. While our standard plan provides excellent functionality for beginners, the Premium Plan is designed for serious marketers looking to maximize their potential.\n\nWith the Premium Plan, you'll enjoy significantly higher usage limits, allowing you to create and manage more affiliate links across a broader range of networks. This increased capacity is perfect for growing businesses or those managing multiple campaigns simultaneously.`,
  },
];

export const FAQ = () => {
  return (
    <div className="my-10 w-full px-3 py-4 md:my-20">
      <h3 className="text-left text-3xl font-semibold">
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
                    {paragraph}
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
