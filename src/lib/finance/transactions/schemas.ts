import { z } from "zod";

export const transactionItemSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1),
  type: z.enum(["expense", "income"]), // ajuste conforme seu enum
  categoryId: z.number().int().positive(),
});

export const registerTransactionInputSchema = z.object({
  description: z
    .string()
    .describe("A descrição da transação (ex: 'Compras do mês', 'Uber')"),
  
  amount: z
    .number()
    .positive()
    .describe("O valor numérico da transação. Deve ser maior que zero."),
  
  type: z
    .enum(["in", "out"])
    .describe("O tipo da transação: 'in' para entradas/ganhos, 'out' para saídas/gastos"),
  
  category: z
    .string()
    .describe("Nome da categoria correspondente"),
});

export type RegisterTransactionInput = z.infer<typeof registerTransactionInputSchema>;