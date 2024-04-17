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

  if (relationship) {
    const accountId = relationship.accountId;
    const apiKey = relationship.apiKey;

    const url = "https://advertiser-lookup.api.cj.com/v2/advertiser-lookup";
    const params = {
      "requestor-cid": accountId,
      "advertiser-ids": "joined",
    };
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    const response = await fetch(`${url}?${new URLSearchParams(params)}`, {
      headers,
    });

    const xmlData = await response.text();
    const parser = new XMLParser();
    const jsonData = parser.parse(xmlData);

    const advertiserElements =
      jsonData["cj-api"]?.advertisers?.advertiser || [];
    const advertiserDict = {};

    for (const advertiser of advertiserElements) {
      const advertiserId = advertiser["advertiser-id"];
      const advertiserName = advertiser["advertiser-name"];
      const advertiserUrl = advertiser["program-url"];
      const modifiedUrl = extractBaseUrlUpdated(advertiserUrl);

      if (advertiserId && advertiserName && modifiedUrl) {
        try {
          let brand;

          brand = await prisma.brand.findFirst({
            where: { url: modifiedUrl },
            include: {
              advertisers: true,
              userBrandRelationships: true,
            },
          });

          if (brand) {
            console.log("brandId", brand.id);
            console.log("advertiserId", relationship.advertiserId);
            console.log("userAdvertiserRelationshipId", relationship.id);
            console.log(
              "brandAdvertiserRelationshipId",
              brand.advertisers[0].id,
            );
            return NextResponse.json(brand);
          } else {
            console.log("No brand");
            return NextResponse.json(
              { error: "Brand not found" },
              { status: 404 },
            );
          }
        } catch (error) {
          console.error("Error fetching brand:", error);
          return NextResponse.json(
            { error: "Error fetching brand" },
            { status: 500 },
          );
        }
      }
    }
    return NextResponse.json(data);
  } else {
    console.log("No relationship found");
    return NextResponse.json(data);
  }
});
