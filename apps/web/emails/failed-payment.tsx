import { DUB_LOGO } from "@dub/utils";
import { Project } from "@prisma/client";
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

export default function FailedPayment({
  user = { name: "Jeremie Gunther", email: "fire@water.co" },
  workspace = { name: "Fluber", slug: "flub" },
  amountDue = 2400,
  attemptCount = 2,
}: {
  user: { name?: string | null; email: string };
  workspace: Pick<Project, "name" | "slug">;
  amountDue: number;
  attemptCount: number;
}) {
  const title = `${
    attemptCount === 2
      ? "2nd Notice: "
      : attemptCount === 3
        ? "3rd Notice: "
        : ""
  }Your payment for AffEasy failed`;

  const urgencyLevel =
    attemptCount === 3 ? "high" : attemptCount === 2 ? "medium" : "low";

  return (
    <Html>
      <Head />
      <Preview>{title} - Action Required</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-lg border border-solid border-gray-200 bg-white p-10 shadow-md">
            <Section className="mb-8 text-center">
              <Img
                src={DUB_LOGO}
                width="60"
                height="60"
                alt="AffEasy"
                className="mx-auto"
              />
            </Section>
            <Heading className="mb-6 text-center text-2xl font-bold text-gray-800">
              {title}
            </Heading>
            <Text className="mb-4 text-base leading-6 text-gray-700">
              Hello{user.name ? ` ${user.name}` : ""},
            </Text>
            <Text className="mb-4 text-base leading-6 text-gray-700">
              We were unable to process your payment of{" "}
              <span className="font-semibold text-purple-600">
                ${(amountDue / 100).toFixed(2)}
              </span>{" "}
              for your AffEasy workspace "{workspace.name}".
            </Text>
            <Section
              className={`mb-6 rounded-lg p-4 ${
                urgencyLevel === "high"
                  ? "bg-red-100"
                  : urgencyLevel === "medium"
                    ? "bg-yellow-100"
                    : "bg-blue-100"
              }`}
            >
              <Text className="mb-2 text-sm font-semibold text-gray-700">
                Payment Attempt:{" "}
                <span className="font-bold">{attemptCount}</span>
              </Text>
              <Text className="mb-0 text-sm font-semibold text-gray-700">
                Status: <span className="font-bold text-red-600">Failed</span>
              </Text>
            </Section>
            <Text className="mb-6 text-base leading-6 text-gray-700">
              To ensure uninterrupted service, please update your payment
              information as soon as possible. You can do this by clicking the
              button below:
            </Text>
            <Section className="mb-8 text-center">
              <Button
                className="rounded-md bg-black px-5 py-5 font-semibold text-white no-underline hover:bg-blue-700"
                href={`https://app.affeasy.link/${workspace.slug}/settings/billing`}
              >
                Update Payment Information
              </Button>
            </Section>
            <Text className="mb-4 text-base leading-6 text-gray-700">
              If you need assistance, here are some helpful resources:
            </Text>
            <ul className="mb-6 list-disc pl-6 text-base leading-6 text-gray-700">
              <li className="mb-2">
                <Link
                  href="https://affeasy.link/help/article/how-to-change-billing-information"
                  className="text-blue-600 no-underline hover:underline"
                >
                  How to update your billing information
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="https://affeasy.link/help/billing"
                  className="text-blue-600 no-underline hover:underline"
                >
                  Billing FAQ
                </Link>
              </li>
            </ul>
            <Text className="mb-6 text-base leading-6 text-gray-700">
              If you have any questions or need further assistance, please don't
              hesitate to reply to this email. Our support team is here to help!
            </Text>
            <Text className="mb-8 text-sm font-semibold text-gray-600">
              Thank you for your prompt attention to this matter.
            </Text>
            <Footer email={user.email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
