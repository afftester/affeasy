import { withSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = withSession(async ({ searchParams }) => {
  const { url } = searchParams;

  try {
    let brand;

    brand = await prisma.brand.findFirst({
      where: { url: url },
      include: {
        advertisers: true,
        userBrandRelationships: true,
      },
    });

    if (brand) {
      return NextResponse.json(brand);
    } else {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching brand:", error);
    return NextResponse.json(
      { error: "Error fetching brand" },
      { status: 500 },
    );
  }
});
