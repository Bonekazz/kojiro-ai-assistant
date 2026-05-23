import { prisma } from "@/lib/prisma";
import { RegisterTransactionInput, registerTransactionInputSchema } from "./schemas";
import z from "zod";

export async function registerTransaction(rawInput: unknown): Promise<{
  sucess?: boolean,
  data?: any,
  errors?: any
}>{

  try { 
    const validInput = z.array(registerTransactionInputSchema).safeParse(rawInput);
    if (!validInput.success) throw new Error(`(!) Error - Invalid input: ${validInput.error.message}`);

    const input = validInput.data!;
    const createdTransactions = await prisma.$transaction(input.map((x: RegisterTransactionInput, i: number) => 
      prisma.transaction.create({
        data: {
          ...x,
          category: { 
            connectOrCreate: { 
              where: { name: x.category },
              create: { name: x.category}
            }
          }
        },
        include: { category: true }
      })
    ))

    return {
      sucess: true,
      data: createdTransactions
    }
  
  } catch (error: any) {
    return {
      sucess: false,
      errors: error
    }
  }
}

export function editTransaction () {}
export function deleteTransaction () {}
export function getTransaction() {}