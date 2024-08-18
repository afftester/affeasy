import { render } from "@react-email/render";
import { Client } from "postmark";
import { JSXElementConstructor, ReactElement } from "react";

export const client = process.env.POSTMARK_API_KEY
  ? new Client(process.env.POSTMARK_API_KEY)
  : null;

export const sendEmail = async ({
  email,
  subject,
  from,
  bcc,
  replyToFromEmail,
  text,
  react,
  marketing,
}: {
  email: string;
  subject: string;
  from?: string;
  bcc?: string;
  replyToFromEmail?: boolean;
  text?: string;
  react?: ReactElement<any, string | JSXElementConstructor<any>>;
  marketing?: boolean;
}) => {
  if (process.env.NODE_ENV === "development" && !client) {
    // Set up a fake email client for development
    console.info(
      `Email to ${email} with subject ${subject} sent from ${
        from || process.env.NEXT_PUBLIC_APP_NAME
      }`,
    );
    return Promise.resolve();
  } else if (!client) {
    console.error(
      "Postmark is not configured. You need to add a POSTMARK_API_KEY in your .env file for emails to work.",
    );
    return Promise.resolve();
  }

  return client.sendEmail({
    From:
      from ||
      (marketing ? "ritanshu@ship.affeasy.link" : "system@notify.affeasy.link"),
    To: email,
    Bcc: bcc,
    ...(!replyToFromEmail && {
      ReplyTo: "support@affeasy.link",
    }),
    Subject: subject,
    ...(text && { TextBody: text }),
    ...(react && { HtmlBody: render(react) }),
    ...(marketing && {
      MessageStream: "broadcast",
    }),
  });
};
