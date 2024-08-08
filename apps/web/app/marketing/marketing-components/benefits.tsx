export function BenefitsCard() {
  const benefits = [
    {
      title: "Unified Network Access",
      description:
        "Effortlessly connect to multiple affiliate networks through a single, streamlined dashboard. Simplify your workflow and manage everything in one place.",
      icon: "🌐",
    },
    {
      title: "Instant Link Generation",
      description:
        "Eliminate the manual process of creating affiliate links. Generate and manage affiliate links in seconds with AffEasy",
      icon: "⚡",
    },
    {
      title: "Advanced Analytics",
      description:
        "Leverage powerful analytics to gain deep insights into your link performance. Monitor clicks, conversions, and more with ease.",
      icon: "📊",
    },
    {
      title: "Free Short Links",
      description:
        "Automatically generate short, shareable links to enhance user engagement and streamline your affiliate marketing efforts.",
      icon: "🔗",
    },
  ];

  return (
    <div>
      <div className="flex w-full max-w-6xl items-center justify-center">
        <h2 className="text-foreground mb-5 text-2xl font-semibold md:text-4xl">
          Simplify your affiliate marketing
        </h2>
      </div>
      <div className="my-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="border-black-100 flex flex-col items-start rounded-md border bg-[#F8F9FA] p-6"
          >
            <div className="flex items-center">
              <span className="mr-2 text-3xl">{benefit.icon}</span>
              <h3 className="text-lg font-semibold">{benefit.title}</h3>
            </div>
            <p className="mt-2 text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
