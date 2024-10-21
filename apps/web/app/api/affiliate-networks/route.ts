// apps/web/app/api/affiliate-networks/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react'; // Adjust import based on auth setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session || !session.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const brands = await prisma.brand.findMany({
      where: {
        userBrandRelationships: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        advertisers: true, // Ensure this relation is defined in Prisma schema
      },
    });
    res.status(200).json({ brands });
  } catch (error) {
    console.error('Error fetching affiliate networks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}