import {
  DUB_LOGO,
  DUB_THUMBNAIL,
  capitalize,
  getNextPlan,
  nFormatter,
} from "@dub/utils";
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
import { WorkspaceProps } from "../lib/types";
import Footer from "./components/footer";

export default function LinksLimitAlert({
  email = "panic@thedis.co",
  workspace = {
    id: "ckqf1q3xw0000gk5u2q1q2q1q",
    name: "Acme",
    slug: "acme",
    linksUsage: 800,
    linksLimit: 1000,
    plan: "pro",
  },
}: {
  email: string;
  workspace: Partial<WorkspaceProps>;
}) {
  const { slug, name, linksUsage, linksLimit, plan } = workspace as {
    slug: string;
    name: string;
    linksUsage: number;
    linksLimit: number;
    plan: string;
  };
  const percentage = Math.round((linksUsage / linksLimit) * 100);
  const nextPlan = getNextPlan(plan as string);

  return (
    <Html>
      <Head />
      <Preview>
        AffEasy Alert: {name} has used {percentage.toString()}% of its monthly
        links limit.
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-lg border border-solid border-gray-200 bg-white px-10 py-5 shadow-lg">
            <Section className="mt-8">
              <Img
                src={DUB_LOGO}
                width="60"
                height="60"
                alt="AffEasy"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-2xl font-bold text-gray-800">
              AffEasy Links Limit Alert
            </Heading>
            <Text className="text-center text-lg font-medium text-gray-600">
              Your workspace is approaching its monthly limit
            </Text>
            <Section className="my-8">
              <Img
                src={DUB_THUMBNAIL}
                alt="AffEasy Platform Usage"
                className="max-w-[500px] rounded-lg shadow-md"
              />
            </Section>
            <Text className="text-base leading-6 text-gray-700">Hi there,</Text>
            <Text className="text-base leading-6 text-gray-700">
              Your AffEasy workspace,{" "}
              <Link
                href={`https://app.affeasy.link/${slug}`}
                className="font-medium text-blue-600 no-underline hover:underline"
              >
                {name}
              </Link>
              , has used <strong>{percentage}%</strong> of its monthly links
              limit. Here's a quick summary:
            </Text>
            <Text className="ml-4 text-base leading-6 text-gray-700">
              • Created links:{" "}
              <strong>{nFormatter(linksUsage, { full: true })}</strong>
              <br />• Monthly limit:{" "}
              <strong>{nFormatter(linksLimit, { full: true })}</strong>
              <br />• Current plan: <strong>{capitalize(plan)}</strong>
            </Text>

            {plan === "business-max" || plan === "enterprise" ? (
              <Text className="text-base leading-6 text-gray-700">
                As a valued {capitalize(plan)} plan member, you can continue
                creating links even after reaching your limit. We're working on
                introducing on-demand billing for overages in the future to
                provide you with even more flexibility.
              </Text>
            ) : percentage === 100 ? (
              <Text className="text-base leading-6 text-gray-700">
                You've reached your monthly limit. While all your existing links
                will continue to work and we'll keep collecting data, you'll
                need to upgrade to the {nextPlan.name} plan to add more links.
              </Text>
            ) : (
              <Text className="text-base leading-6 text-gray-700">
                To ensure uninterrupted service, consider upgrading to the{" "}
                {nextPlan.name} plan before you hit your limit. This will allow
                you to continue adding more links and growing your affiliate
                marketing efforts.
              </Text>
            )}

            <Section className="mt-8 text-center">
              <Button
                className="rounded-md bg-black px-6 py-3 text-base font-semibold text-white no-underline"
                href={`https://app.affeasy.link/${slug}?upgrade=${nextPlan.name.toLowerCase()}`}
              >
                Upgrade to {nextPlan.name}
              </Button>
            </Section>

            <Text className="mt-8 text-base leading-6 text-gray-700">
              If you have any questions about your usage or need assistance with
              upgrading, our support team is always here to help. Your success
              is our priority!
            </Text>
            <Text className="mt-4 text-base font-medium leading-6 text-gray-700">
              Best regards,
            </Text>
            <Text className="text-base font-medium leading-6 text-gray-700">
              The AffEasy Team
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
