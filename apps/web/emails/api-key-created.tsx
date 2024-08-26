import { DUB_LOGO, formatDate } from "@dub/utils";
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

export default function APIKeyCreated({
  email = "party@indahouse.com",
  apiKeyName = "FuBat",
}: {
  email: string;
  apiKeyName: string;
}) {
  const creationDate = formatDate(new Date().toString());

  return (
    <Html>
      <Head />
      <Preview>
        New API Key "{apiKeyName}" Created for Your AffEasy Account
      </Preview>
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
              New API Key Created
            </Heading>
            <Text className="mb-4 text-base leading-6 text-gray-700">
              Hello,
            </Text>
            <Text className="mb-4 text-base leading-6 text-gray-700">
              This is to inform you that a new API key has been created for your
              AffEasy account with the following details:
            </Text>
            <Section className="mb-6 rounded-lg bg-gray-100 p-4">
              <Text className="mb-2 text-sm font-semibold text-gray-700">
                API Key Name:{" "}
                <span className="font-bold text-blue-600">{apiKeyName}</span>
              </Text>
              <Text className="mb-2 text-sm font-semibold text-gray-700">
                Creation Date:{" "}
                <span className="font-bold text-blue-600">{creationDate}</span>
              </Text>
            </Section>
            <Text className="mb-6 text-base leading-6 text-gray-700">
              For security reasons, we don't display the full API key in this
              email. You can view and manage your API keys in your account
              settings.
            </Text>
            <Section className="mb-8 text-center">
              <Button
                className="rounded-md bg-black px-5 py-5 font-semibold text-white no-underline hover:bg-blue-700"
                href="https://app.affeasy.link/settings/tokens"
              >
                View API Keys
              </Button>
            </Section>
            <Text className="mb-6 text-base leading-6 text-gray-700">
              If you did not create this API key, please take immediate action:
            </Text>
            <ol className="mb-6 list-decimal pl-6 text-base leading-6 text-gray-700">
              <li className="mb-2">
                <Link
                  href="https://app.affeasy.link/settings/tokens"
                  className="font-medium text-blue-600 no-underline hover:underline"
                >
                  Delete this API key
                </Link>{" "}
                from your account.
              </li>
              <li className="mb-2">
                Review your account activity for any suspicious actions.
              </li>
              <li>
                Consider changing your account password and enabling two-factor
                authentication if you haven't already.
              </li>
            </ol>
            <Text className="mb-8 text-base leading-6 text-gray-700">
              If you have any questions or concerns, please don't hesitate to
              contact our support team.
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
