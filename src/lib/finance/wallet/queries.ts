import { sql } from 'drizzle-orm';
import { transactions } from '@/db/schema';


import { db } from '@/db/db';

export function getWalletBalance(): number {
  // Soma todas as entradas ('in') e subtrai todas as saídas ('out')
  const result = db
    .select({
      totalIn: sql<number>`SUM(CASE WHEN type = 'in' THEN amount ELSE 0 END)`,
      totalOut: sql<number>`SUM(CASE WHEN type = 'out' THEN amount ELSE 0 END)`,
    })
    .from(transactions)
    .get();

  const balance = (result?.totalIn || 0) - (result?.totalOut || 0);
  return balance;
}

