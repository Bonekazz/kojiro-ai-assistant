import { z } from "zod";

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
  
  categoryId: z
    .number()
    .int()
    .optional()
    .nullable()
    .describe("O ID numérico da categoria correspondente"),
  
  groceryTripId: z
    .number()
    .int()
    .optional()
    .nullable()
    .describe("O ID numérico da viagem ao mercado (opcional, use apenas se fizer parte de uma compra de mercado)"),
});

export type RegisterTransactionInput = z.infer<typeof registerTransactionInputSchema>;