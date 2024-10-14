import { encrypt, withSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/user/userAdvertiserRelationships – get all user-advertiser relationships for a specific user
export const GET = withSession(async ({ session }) => {
  const userAdvertiserRelationships =
    await prisma.userAdvertiserRelationship.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        advertiserId: true,
        partialApiKey: true,
        username: true,
        partialPassword: true,
        clientId: true,
        partialClientSecret: true,
        accountId: true,
        websiteId: true,
        advertiser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  // console.log(userAdvertiserRelationships);
  return NextResponse.json(userAdvertiserRelationships);
});

// POST /api/user/networks – create a new UserAdvertiserRelationship
export const POST = withSession(async ({ req, session }) => {
  const {
    advertiserId,
    username,
    password,
    apiKey,
    accountId,
    websiteId,
    clientId,
    clientSecret,
  } = await req.json();

  const userAdvertiserRelationship =
    await prisma.userAdvertiserRelationship.create({
      data: {
        userId: session.user.id,
        advertiserId,
        partialApiKey: apiKey
          ? `${apiKey.slice(0, 2)}...${apiKey.slice(-4)}`
          : undefined,
        encryptedApiKey: apiKey ? encrypt(apiKey) : undefined,
        username,
        partialPassword: password
          ? `${password.slice(0, 2)}...${password.slice(-2)}`
          : undefined,
        encryptedPassword: password ? encrypt(password) : undefined,
        accountId,
        websiteId,
        clientId,
        partialClientSecret: clientSecret
          ? `${clientSecret.slice(0, 2)}...${clientSecret.slice(-2)}`
          : undefined,
        encryptedClientSecret: clientSecret ? encrypt(clientSecret) : undefined,
      },
    });

  return NextResponse.json({ userAdvertiserRelationship });
});
// DELETE /api/user/networks – delete a UserAdvertiserRelationship
export const DELETE = withSession(async ({ searchParams, session }) => {
  const { id } = searchParams;

  const response = await prisma.userAdvertiserRelationship.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(response);
});

// PUT /api/user/networks – update an existing UserAdvertiserRelationship record
export const PUT = withSession(async ({ req }) => {
  const {
    id,
    apiKey,
    username,
    password,
    accountId,
    websiteId,
    clientId,
    clientSecret,
  } = await req.json();

  const updateData: any = {};

  if (username !== undefined) updateData.username = username;
  if (apiKey !== undefined) {
    updateData.partialApiKey = `${apiKey.slice(0, 2)}...${apiKey.slice(-4)}`;
    updateData.encryptedApiKey = encrypt(apiKey);
  }
  if (password !== undefined) {
    updateData.partialPassword = `${password.slice(0, 2)}...${password.slice(-2)}`;
    updateData.encryptedPassword = encrypt(password);
  }
  if (accountId !== undefined) updateData.accountId = accountId;
  if (websiteId !== undefined) updateData.websiteId = websiteId;
  if (clientId !== undefined) updateData.clientId = clientId;
  if (clientSecret !== undefined) {
    updateData.partialClientSecret = `${clientSecret.slice(0, 2)}...${clientSecret.slice(-2)}`;
    updateData.encryptedClientSecret = encrypt(clientSecret);
  }

  const userAdvertiserRelationship =
    await prisma.userAdvertiserRelationship.update({
      where: { id },
      data: updateData,
    });

  return NextResponse.json({ userAdvertiserRelationship });
});
