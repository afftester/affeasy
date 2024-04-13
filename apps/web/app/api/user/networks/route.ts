import { withSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// // GET /api/user/networks – get all networks for a specific user
// export const GET = withSession(async ({ session }) => {
//   const networks = await prisma.advertiser.findMany({
//     where: {
//       userAdvertiserRelationships: {
//         some: {
//           userId: session.user.id,
//         },
//       },
//     },
//     select: {
//       id: true,
//       name: true,
//     },
//   });
//   // console.log(networks);
//   return NextResponse.json(networks);
// });

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
        apiKey: true,
        username: true,
        password: true,
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
  console.log(userAdvertiserRelationships);
  return NextResponse.json(userAdvertiserRelationships);
});

// POST /api/user/networks – create a new UserAdvertiserRelationship
export const POST = withSession(async ({ req, session }) => {
  const { advertiserId, username, password, apiKey, accountId, websiteId } =
    await req.json();

  const userAdvertiserRelationship =
    await prisma.userAdvertiserRelationship.create({
      data: {
        userId: session.user.id,
        advertiserId,
        apiKey,
        username,
        password,
        accountId,
        websiteId,
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
  const { id, apiKey, username, password, accountId, websiteId } =
    await req.json();

  const updatedUserAdvertiserRelationship =
    await prisma.userAdvertiserRelationship.update({
      where: {
        id,
      },
      data: {
        username,
        apiKey,
        password,
        accountId,
        websiteId,
      },
    });

  return NextResponse.json({ updatedUserAdvertiserRelationship });
});
