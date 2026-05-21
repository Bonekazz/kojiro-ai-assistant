import { prisma } from "@/lib/prisma";

export async function getWalletBalance(): Promise<number> {
  const agg = await prisma.transaction.groupBy({
    by: ["type"],
    _sum: { amount: true }
  });

  const totalIn = agg.find(item => item.type === 'in')?._sum.amount || 0;
  const totalOut = agg.find(item => item.type === 'out')?._sum.amount || 0;

  return totalIn - totalOut;
}

