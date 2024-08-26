import { DUB_LOGO, DUB_THUMBNAIL } from "@dub/utils";
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

export default function WelcomeEmail({
  name = "Jeremy James",
  email = "jeremy@james.com",
}: {
  name: string | null;
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to AffEasy - Affiliate Marketing Made Easy!</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-lg border border-solid border-gray-200 bg-white px-10 py-5 shadow-lg">
            <Section key="logo" className="mt-8">
              <Img
                src={DUB_LOGO}
                width="60"
                height="60"
                alt="AffEasy"
                className="mx-auto my-0"
              />
            </Section>
            <Heading
              key="heading"
              className="mx-0 my-7 p-0 text-center text-2xl font-bold text-gray-800"
            >
              Welcome to AffEasy!
            </Heading>
            <Text
              key="subheading"
              className="text-center text-lg font-medium text-gray-600"
            >
              Affiliate Marketing Made Easy
            </Text>
            <Section key="thumbnail" className="my-8">
              <Img
                src={DUB_THUMBNAIL}
                alt="AffEasy Platform Preview"
                className="max-w-[500px] rounded-lg shadow-md"
              />
            </Section>
            <Text key="greeting" className="text-base leading-6 text-gray-700">
              Hi{name ? ` ${name}` : ""},
            </Text>
            <Text
              key="introduction"
              className="text-base leading-6 text-gray-700"
            >
              I'm Ritanshu, the founder of AffEasy - the modern affiliate
              marketing platform designed to supercharge your success. We're
              thrilled to have you on board!
            </Text>
            <Text
              key="get-started"
              className="text-base leading-6 text-gray-700"
            >
              Here are a few things you can do to get started:
            </Text>

            <Text
              key="step1"
              className="ml-1 mt-2 text-base leading-6 text-gray-700"
            >
              1. Add your first{" "}
              <Link
                href="https://docs.affeasy.link/quickstart/affiliate-networks/introduction"
                className="font-medium text-blue-600 no-underline hover:underline"
              >
                affiliate network 🌐
              </Link>
            </Text>
            <Text
              key="step2"
              className="ml-1 mt-4 text-base leading-6 text-gray-700"
            >
              2. Create your first{" "}
              <Link
                href="https://docs.affeasy.link/quickstart/guide"
                className="font-medium text-blue-600 no-underline hover:underline"
              >
                affiliate link 🔗
              </Link>
            </Text>

            <Text
              key="step3"
              className="ml-1 mt-2 text-base leading-6 text-gray-700"
            >
              3. Learn more about{" "}
              <Link
                href="https://affeasy.com/api"
                className="font-medium text-blue-600 no-underline hover:underline"
              >
                how AffEasy works
              </Link>{" "}
              🚀
            </Text>

            <Section key="cta" className="mt-8 text-center">
              <Button
                className="rounded-md bg-black px-5 py-5 font-semibold text-white no-underline"
                href="https://affeasy.link"
              >
                Get Started Now
              </Button>
            </Section>

            <Text
              key="support"
              className="mt-8 text-base leading-6 text-gray-700"
            >
              We're here to support your affiliate marketing journey every step
              of the way. If you have any questions, need assistance, or want to
              share feedback, don't hesitate to reach out. Your success is our
              priority!
            </Text>
            <Text
              key="closing1"
              className="mt-4 text-base font-medium leading-6 text-gray-700"
            >
              Best regards,
            </Text>
            <Text
              key="closing2"
              className="text-base font-medium leading-6 text-gray-700"
            >
              Ritanshu
            </Text>
            <Text
              key="closing3"
              className="text-sm font-light leading-6 text-gray-500"
            >
              Founder, AffEasy
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
