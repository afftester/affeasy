import { DUB_LOGO } from "@dub/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import Footer from "./components/footer";

export default function WorkspaceInvite({
  email = "panicking@thedis.co",
  appName = "Dub.co",
  url = "http://localhost:8888/api/auth/callback/email?callbackUrl=http%3A%2F%2Fapp.localhost%3A3000%2Flogin&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&email=youremail@gmail.com",
  workspaceName = "Acme",
  workspaceUser = "Brendon Urie",
  workspaceUserEmail = "panic@thedis.co",
}: {
  email: string;
  appName: string;
  url: string;
  workspaceName: string;
  workspaceUser: string | null;
  workspaceUserEmail: string | null;
}) {
  return (
    <Html>
      <Head />
      <Preview>
        You've been invited to join {workspaceName} on {appName}!
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-lg border border-solid border-gray-200 bg-white p-10 shadow-lg">
            <Section className="mb-8 text-center">
              <Img
                src={DUB_LOGO}
                width="64"
                height="64"
                alt={appName}
                className="mx-auto"
              />
            </Section>
            <Heading className="mb-6 text-center text-2xl font-bold text-gray-800">
              Join {workspaceName} on {appName}
            </Heading>
            <Text className="mb-6 text-center text-base text-gray-600">
              {workspaceUser && workspaceUserEmail ? (
                <>
                  <strong className="text-gray-800">{workspaceUser}</strong> (
                  {workspaceUserEmail}) has invited you to join the{" "}
                  <strong className="text-gray-800">{workspaceName}</strong>{" "}
                  workspace on {appName}!
                </>
              ) : (
                <>
                  You have been invited to join the{" "}
                  <strong className="text-gray-800">{workspaceName}</strong>{" "}
                  workspace on {appName}!
                </>
              )}
            </Text>
            <Section className="mb-8 text-center">
              <Button
                className="rounded-md bg-black px-5 py-5 font-semibold text-white no-underline hover:bg-blue-700 "
                href={url}
              >
                Join Workspace
              </Button>
            </Section>
            <Text className="mb-6 text-center text-sm text-gray-500">
              or copy and paste this URL into your browser:
            </Text>
            <Text className="mb-8 break-all text-center text-xs text-blue-600">
              {url.replace(/^https?:\/\//, "")}
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
