import { prisma } from "@/lib/prisma";
import { registerTransactionInputSchema } from "./schemas";

export async function registerTransaction(rawInput: unknown): Promise<{
  sucess?: boolean,
  data?: any,
  errors?: any
}>{

  try { 
    const validInput = registerTransactionInputSchema.safeParse(rawInput);
    if (!validInput.success) throw new Error(`(!) Error - Invalid input: ${validInput.error.message}`);

    const input = validInput.data!;
    const newTransaction = await prisma.transaction.create({
      data: {
        ...input,
        category: { 
          connectOrCreate: { 
            where: { name: input.category },
            create: { name: input.category}
          }
        }
      },
      include: { category: true }
    });


    return {
      sucess: true,
      data: newTransaction
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