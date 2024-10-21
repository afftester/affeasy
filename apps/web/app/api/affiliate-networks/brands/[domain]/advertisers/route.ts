// apps/web/app/api/affiliate-networks/brands/[domain]/advertisers/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react'; // Adjust import based on auth setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { domain } = req.query;
  const session = await getSession({ req });
  if (!session || !session.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const advertisers = await prisma.advertiser.findMany({
        where: {
          userBrandRelationships: {
            some: {
              userId: session.user.id,
              brand: {
                url: domain as string,
              },
            },
          },
        },
      });
      res.status(200).json({ advertisers });
    } catch (error) {
      console.error('Error fetching advertisers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}