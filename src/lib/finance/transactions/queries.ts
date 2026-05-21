import { db } from "@/db/db";
import { transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { registerTransactionInputSchema } from "./schemas";

export async function registerTransaction(rawInput: unknown) {

  const parsedInput = registerTransactionInputSchema.parse(rawInput);

  const { amount, description, type, categoryId, groceryTripId } = parsedInput;

  try {

    const [inserted] = await db
      .insert(transactions)
      .values({
        description,
        amount,
        type,
        categoryId,
        groceryTripId: groceryTripId ?? null
      })
      .returning({insertedId: transactions.id})

      if (!inserted) throw new Error("Error on inserting transaction.");

      // Retorna a transação com os dados da categoria acoplados automaticamente
      const fullTransaction = await db
        .select({})
        .from(transactions)
        .where(eq(transactions.id, inserted.insertedId))

      const result = {
        success: true,
        message: "Transação registrada com sucesso!",
        data: fullTransaction,
      };

      console.log("> RESULT: ", result);
      return result;

  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido.",
    };
  }
}


export function editTransaction () {}
export function deleteTransaction () {}
export function getTransaction() {}