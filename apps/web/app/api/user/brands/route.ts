import { generateRakutenToken } from "@/lib/advertisers";
import { decrypt, withSession } from "@/lib/auth";
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
// POST /api/user/brands
export const POST = withSession(async ({ req, session }) => {
  const data = await req.json();
  const relationship = data.userAdvertiserRelationship;
  if (!relationship) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const accountId = relationship.accountId;
  const encryptedApiKey = relationship.encryptedApiKey;
  const advertiserId = relationship.advertiserId;

  if (advertiserId === "1") {
    // Call the CJ advertiser lookup API to get a list of advertisers for the account
    const apiKey = decrypt(encryptedApiKey);
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
          const brandId = advertiser["advertiser-id"].toString();
          const advertiserName = advertiser["advertiser-name"];

          const modifiedUrl = extractBaseUrlUpdated(advertiserUrl);
          if (modifiedUrl) {
            const brand = await prisma.brand.findFirst({
              where: {
                url: modifiedUrl,
                advertisers: {
                  some: {
                    brandIdAtAdvertiser: brandId,
                    advertiserId,
                  },
                },
              },
              include: {
                advertisers: {
                  where: { advertiserId: advertiserId },
                },
                userBrandRelationships: {
                  where: { userId: session.user.id, advertiserId },
                },
              },
            });

            if (!brand) {
              // Create a new brand
              const newBrand = await prisma.brand.create({
                data: {
                  name: advertiserName, // You can set the brand name to the advertiserName or provide a different value
                  url: modifiedUrl,
                  advertisers: {
                    create: {
                      brandIdAtAdvertiser: brandId,
                      advertiserId,
                    },
                  },
                },
                include: {
                  advertisers: {
                    where: { advertiserId: advertiserId },
                  },
                },
              });

              // Create a new userBrandRelationship
              const userBrandRelationship =
                await prisma.userBrandRelationship.create({
                  data: {
                    userId: session.user.id,
                    brandId: newBrand.id,
                    advertiserId,
                    userAdvertiserRelationId: relationship.id,
                    brandAdvertiserRelationId: newBrand.advertisers[0].id,
                  },
                });
            }

            if (brand) {
              let userBrandRelationship = brand.userBrandRelationships[0];
              if (!userBrandRelationship) {
                userBrandRelationship =
                  await prisma.userBrandRelationship.create({
                    data: {
                      userId: session.user.id,
                      brandId: brand.id,
                      advertiserId,
                      userAdvertiserRelationId: relationship.id,
                      brandAdvertiserRelationId: brand.advertisers[0].id,
                    },
                  });
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
      // console.error("Error fetching advertiser data:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  } else if (advertiserId === "2") {
    const clientId = relationship.clientId;
    const encryptedClientSecret = relationship.encryptedClientSecret;
    const clientSecret = decrypt(encryptedClientSecret);
    const token = await generateRakutenToken(clientId, clientSecret, accountId);
    const accessUrl =
      "https://api.linksynergy.com/linklocator/1.0/getMerchByAppStatus/approved";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(accessUrl, { headers });
      const xmlData = await response.text();
      const parser = new XMLParser();
      const jsonData = parser.parse(xmlData);
      const returnElements =
        jsonData["ns1:getMerchByAppStatusResponse"]["ns1:return"] || [];

      const advertisersInfo = await Promise.all(
        returnElements.map(async (returnElement) => {
          const mid = returnElement["ns1:mid"];
          const advertiserName = returnElement["ns1:name"];
          const advertiserUrl = `https://api.linksynergy.com/v2/advertisers/${mid}`;
          const advertiserResponse = await fetch(advertiserUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (advertiserResponse.status === 200) {
            const advertiserData: {
              advertiser: {
                url: string;
              };
            } = (await advertiserResponse.json()) as {
              advertiser: {
                url: string;
              };
            };
            const advertiserUrl = advertiserData.advertiser.url;
            const modifiedUrl = extractBaseUrlUpdated(advertiserUrl);

            if (modifiedUrl) {
              const brand = await prisma.brand.findFirst({
                where: {
                  url: modifiedUrl,
                  advertisers: {
                    some: {
                      brandIdAtAdvertiser: mid.toString(),
                      advertiserId,
                    },
                  },
                },
                include: {
                  advertisers: {
                    where: { advertiserId: advertiserId },
                  },
                  userBrandRelationships: {
                    where: { userId: session.user.id, advertiserId },
                  },
                },
              });

              if (!brand) {
                // Create a new brand
                const newBrand = await prisma.brand.create({
                  data: {
                    name: advertiserName, // You can set the brand name to the advertiserName or provide a different value
                    url: modifiedUrl,
                    advertisers: {
                      create: {
                        brandIdAtAdvertiser: mid.toString(),
                        advertiserId,
                      },
                    },
                  },
                  include: {
                    advertisers: {
                      where: { advertiserId: advertiserId },
                    },
                  },
                });

                // Create a new userBrandRelationship
                const userBrandRelationship =
                  await prisma.userBrandRelationship.create({
                    data: {
                      userId: session.user.id,
                      brandId: newBrand.id,
                      advertiserId,
                      userAdvertiserRelationId: relationship.id,
                      brandAdvertiserRelationId: newBrand.advertisers[0].id,
                    },
                  });
              }
              if (brand) {
                let userBrandRelationship = brand.userBrandRelationships[0];
                if (!userBrandRelationship) {
                  userBrandRelationship =
                    await prisma.userBrandRelationship.create({
                      data: {
                        userId: session.user.id,
                        brandId: brand.id,
                        advertiserId,
                        userAdvertiserRelationId: relationship.id,
                        brandAdvertiserRelationId: brand.advertisers[0].id,
                      },
                    });
                }

                return { brand, userBrandRelationship };
              }
            }
          }
        }),
      );

      const validBrands = returnElements.filter(Boolean);
      return NextResponse.json(validBrands);
    } catch (error) {
      // console.error("Error fetching advertiser data:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  } else if (advertiserId === "3") {
    try {
      const brand = await prisma.brand.findFirst({
        where: {
          url: "www.amazon.com",
        },
        include: {
          advertisers: {
            where: { advertiserId: advertiserId },
          },
          userBrandRelationships: {
            where: { userId: session.user.id, advertiserId },
          },
        },
      });

      if (brand) {
        let userBrandRelationship = brand.userBrandRelationships[0];

        if (!userBrandRelationship) {
          // Create a new userBrandRelationship only if it doesn't exist
          userBrandRelationship = await prisma.userBrandRelationship.create({
            data: {
              userId: session.user.id,
              brandId: brand.id,
              advertiserId,
              userAdvertiserRelationId: relationship.id,
              brandAdvertiserRelationId: brand.advertisers[0].id,
            },
          });
        }

        return NextResponse.json([{ brand, userBrandRelationship }]);
      } else {
        // Handle case where Amazon brand is not found in the database
        return NextResponse.json(
          { error: "Amazon brand not found in database" },
          { status: 404 },
        );
      }
    } catch (error) {
      console.error("Error processing Amazon advertiser:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  } else if (advertiserId === "4") {
    try {
      const brands = await prisma.brand.findMany({
        where: {
          advertisers: {
            some: {
              advertiserId: advertiserId,
            },
          },
        },
        include: {
          advertisers: {
            where: { advertiserId: advertiserId },
          },
          userBrandRelationships: {
            where: { userId: session.user.id, advertiserId },
          },
        },
      });

      const userBrandRelationships = await Promise.all(
        brands.map(async (brand) => {
          let userBrandRelationship = brand.userBrandRelationships[0];

          if (!userBrandRelationship) {
            userBrandRelationship = await prisma.userBrandRelationship.create({
              data: {
                userId: session.user.id,
                brandId: brand.id,
                advertiserId,
                userAdvertiserRelationId: relationship.id,
                brandAdvertiserRelationId: brand.advertisers[0].id,
              },
            });
          }

          return { brand, userBrandRelationship };
        }),
      );

      return NextResponse.json(userBrandRelationships);
    } catch (error) {
      console.error("Error processing advertiser ID 4:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  } else if (advertiserId === "5") {
    // Partnerize-specific processing
    try {
      const apiKey = decrypt(encryptedApiKey);
      const partnerizeUrl = "https://api.partnerize.com/v1/affiliate/link";

      const response = await fetch(partnerizeUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: processedUrl,
          campaign_id: accountId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ affiliateUrl: data.affiliate_link_url });
      } else {
        const errorData = await response.json();
        return NextResponse.json(
          { error: `Partnerize API error: ${errorData.message}` },
          { status: response.status },
        );
      }
    } catch (error) {
      console.error("Error processing Partnerize advertiser:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json(
      { error: "Invalid advertiser ID" },
      { status: 400 },
    );
  }
});
