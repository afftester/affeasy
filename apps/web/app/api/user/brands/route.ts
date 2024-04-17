import { withSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { XMLParser } from "fast-xml-parser";
import { NextResponse } from "next/server";
import fetch from "node-fetch";

function extractBaseUrlUpdated(url) {
  // Remove the protocol part (http:// or https://) if present
  if (url.includes("://")) {
    url = url.split("://")[1];
  }

  // Split by '/' to remove paths, then take the first part and split by '?' to remove query parameters
  const baseUrl = url.split("/")[0].split("?")[0];

  return baseUrl;
}

// GET /api/user/brands
export const POST = withSession(async ({ req, session }) => {
  const data = await req.json();
  const relationship = data.userAdvertiserRelationship;

  if (!relationship) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const accountId = relationship.accountId;
  const apiKey = relationship.apiKey;
  const advertiserId = relationship.advertiserId;
  // console.log(advertiserId);

  // Call the CJ advertiser lookup API to get a list of advertisers for the account
  const url = "https://advertiser-lookup.api.cj.com/v2/advertiser-lookup";
  const params = {
    "requestor-cid": accountId,
    "advertiser-ids": "joined",
  };
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await fetch(`${url}?${new URLSearchParams(params)}`, {
      headers,
    });
    const xmlData = await response.text();
    const parser = new XMLParser();
    const jsonData = parser.parse(xmlData);
    const advertiserElements =
      jsonData["cj-api"]?.advertisers?.advertiser || [];

    const brands = await Promise.all(
      advertiserElements.map(async (advertiser) => {
        const advertiserUrl = advertiser["program-url"];
        const modifiedUrl = extractBaseUrlUpdated(advertiserUrl);

        if (modifiedUrl) {
          const brand = await prisma.brand.findFirst({
            where: { url: modifiedUrl },
            include: {
              advertisers: {
                where: {
                  advertiserId: advertiserId,
                },
              },
              userBrandRelationships: {
                where: {
                  userId: session.user.id,
                  advertiserId,
                },
              },
            },
          });

          if (brand) {
            // console.log(brand);
            let userBrandRelationship = brand.userBrandRelationships[0];
            if (!userBrandRelationship) {
              console.log("creating relationship");
              userBrandRelationship = await prisma.userBrandRelationship.create(
                {
                  data: {
                    userId: session.user.id,
                    brandId: brand.id,
                    advertiserId,
                    userAdvertiserRelationId: relationship.id,
                    brandAdvertiserRelationId: brand.advertisers[0].id,
                  },
                },
              );
            } else {
              console.log("relationship already exists");
            }
            return { brand, userBrandRelationship };
          }
        }

        return null;
      }),
    );

    const validBrands = brands.filter(Boolean);
    return NextResponse.json(validBrands);
  } catch (error) {
    console.error("Error fetching advertiser data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
});
