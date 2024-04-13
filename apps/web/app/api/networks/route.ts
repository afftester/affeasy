import {
  addDomainToVercel,
  setRootDomain,
  validateDomain,
} from "@/lib/api/domains";
import { exceededLimitError } from "@/lib/api/errors";
import { withAuth, withSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = withSession(async ({}) => {
  const networks = await prisma.advertiser.findMany({
    select: {
      id: true, // Select the id field
      name: true, // Select the name field
      // Add any other fields you need to retrieve here
    },
  });

  return NextResponse.json(networks);
});

// POST /api/domains - add a domain
export const POST = withAuth(async ({ req, workspace }) => {
  const { slug: domain, primary, archived, target, type } = await req.json();

  if (workspace.domains.length >= workspace.domainsLimit) {
    return new Response(
      exceededLimitError({
        plan: workspace.plan,
        limit: workspace.domainsLimit,
        type: "domains",
      }),
      { status: 403 },
    );
  }

  const validDomain = await validateDomain(domain);

  if (validDomain !== true) {
    return new Response(validDomain, { status: 422 });
  }
  const vercelResponse = await addDomainToVercel(domain);

  if (vercelResponse.error) {
    return new Response(vercelResponse.error.message, { status: 422 });
  }
  /* 
          If the domain is being added, we need to:
            1. Add the domain to Vercel
            2. If there's a landing page set, update the root domain in Redis
            3. If the domain is being set as the primary domain, set all other domains to not be the primary domain
            4. Add the domain to the database along with its primary status
        */
  const response = await Promise.all([
    prisma.domain.create({
      data: {
        slug: domain,
        target,
        type,
        projectId: workspace.id,
        primary: primary || workspace.domains.length === 0,
        archived,
      },
    }),
    primary &&
      prisma.domain.updateMany({
        where: {
          projectId: workspace.id,
          primary: true,
        },
        data: {
          primary: false,
        },
      }),
  ]);

  await setRootDomain({
    id: response[0].id,
    domain,
    projectId: workspace.id,
    ...(workspace.plan !== "free" && {
      url: target,
    }),
    rewrite: type === "rewrite",
  });

  return NextResponse.json(response);
});
