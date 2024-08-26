import { DUB_LOGO, getPlanDetails } from "@dub/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import Footer from "./components/footer";

export default function UpgradeEmail({
  name = "James Jeremie",
  email = "jeremie@james.com",
  plan = "Pro",
}: {
  name: string | null;
  email: string;
  plan: string;
}) {
  const planDetails = getPlanDetails(plan);
  return (
    <Html>
      <Head />
      <Preview>
        Thank you for upgrading to AffEasy {plan}! Your journey to affiliate
        marketing success begins now.
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-lg border border-solid border-gray-200 bg-white p-10 shadow-lg">
            <Section className="mb-8 text-center">
              <Img
                src={DUB_LOGO}
                width="64"
                height="64"
                alt="AffEasy"
                className="mx-auto"
              />
            </Section>
            <Heading className="mb-6 text-center text-2xl font-bold text-gray-800">
              Welcome to AffEasy {plan}!
            </Heading>
            <Section className="mb-8">
              <Img
                src="https://public.blob.vercel-storage.com/kmKY9FhOzDRAX28c/thank-you-PCJDehD1yOJdagchd7TuDCI0JnXVo7.png"
                alt="Thank you"
                className="w-full rounded-lg"
              />
            </Section>
            <Text className="mb-4 text-base leading-6 text-gray-700">
              Hey{name && ` ${name}`}!
            </Text>
            <Text className="mb-4 text-base leading-6 text-gray-700">
              I'm Ritanshu, the founder of AffEasy. I wanted to personally thank
              you for upgrading to{" "}
              <Link
                href={planDetails.link}
                className="font-medium text-blue-600 no-underline hover:underline"
              >
                AffEasy {plan}
              </Link>
              . Your support means the world to us!
            </Text>
            <Text className="mb-4 text-base leading-6 text-gray-700">
              As a{" "}
              <Link
                href="https://affeasy.link/blog/why-open-source"
                className="font-medium text-blue-600 no-underline hover:underline"
              >
                100% bootstrapped
              </Link>{" "}
              and{" "}
              <Link
                href="https://github.com/afftester/afftester"
                className="font-medium text-blue-600 no-underline hover:underline"
              >
                open-source
              </Link>{" "}
              business, your upgrade helps us continue to innovate and improve
              AffEasy for you and the entire community.
            </Text>
            <Text className="mb-4 text-base font-semibold leading-6 text-gray-800">
              Here's what you now have access to with the {plan} plan:
            </Text>
            <ul className="mb-6 list-none space-y-2 pl-0">
              {planDetails.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-base text-gray-700"
                >
                  <span className="mr-2 text-green-500">✓</span>
                  {feature.text}
                </li>
              ))}
            </ul>
            <Section className="mb-8 text-center">
              <Button
                className="rounded-md bg-black px-5 py-5 font-semibold text-white no-underline hover:bg-blue-700"
                href="https://app.affeasy.link"
              >
                Explore Your New Features
              </Button>
            </Section>
            <Text className="mb-4 text-base leading-6 text-gray-700">
              If you have any questions, need assistance, or want to share
              feedback, please don't hesitate to reach out. Your success is our
              priority!
            </Text>
            <Text className="mb-8 text-base font-medium leading-6 text-gray-700">
              Best regards,
              <br />
              Ritanshu
              <br />
              <span className="text-sm font-light text-gray-500">
                Founder, AffEasy
              </span>
            </Text>
            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
