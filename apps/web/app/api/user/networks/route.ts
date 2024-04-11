import { hashToken, withSession } from "@/lib/auth";
import { qstash } from "@/lib/cron";
import prisma from "@/lib/prisma";
import { APP_DOMAIN_WITH_NGROK, nanoid } from "@dub/utils";
import { NextResponse } from "next/server";

// GET /api/user/networks – get all networks for a specific user
export const GET = withSession(async ({ session }) => {
  const networks = await prisma.advertiser.findMany({
    where: {
      userAdvertiserRelationships: {
        some: {
          userId: session.user.id,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(networks);
});

// POST /api/user/tokens – create a new token for a specific user
export const POST = withSession(async ({ req, session }) => {
  const { name } = await req.json();
  const token = nanoid(24);
  const hashedKey = hashToken(token, {
    noSecret: true,
  });
  // take first 3 and last 4 characters of the key
  const partialKey = `${token.slice(0, 3)}...${token.slice(-4)}`;
  await Promise.all([
    prisma.token.create({
      data: {
        name,
        hashedKey,
        partialKey,
        userId: session.user.id,
      },
    }),
    qstash.publishJSON({
      url: `${APP_DOMAIN_WITH_NGROK}/api/cron/notify`,
      body: {
        type: "API_KEY_CREATED",
        props: {
          email: session.user.email,
          apiKeyName: name,
        },
      },
    }),
  ]);
  return NextResponse.json({ token });
});

// DELETE /api/user/tokens – delete a token for a specific user
export const DELETE = withSession(async ({ searchParams, session }) => {
  const { id } = searchParams;

  const response = await prisma.userAdvertiserRelationship.delete({
    where: {
      userId_advertiserId: {
        userId: session.user.id,
        advertiserId: id,
      },
    },
  });

  return NextResponse.json(response);
});
