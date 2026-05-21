import { isLoopFinished, stepCountIs, tool } from "ai"
import z from "zod"
import { getWalletBalance } from "@/lib/finance/wallet/queries.js"
import { createGroq } from "@ai-sdk/groq";
import { registerTransaction } from "../finance/transactions/queries";
import { registerTransactionInputSchema } from "../finance/transactions/schemas";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  throw new Error("Groq api key not defined in .env");
}

const groq = createGroq({
  apiKey: GROQ_API_KEY,
});

export const system =`
  Voce é um assistente financeiro pessoal. Sua função é auxiliar o financeiro do usuário,
  gerando relatórios, executando queries no banco financeiro (tools), e dando sugestões/recomendações/conselhos
  APENAS quando for pedido, sempre de forma detalhista (principalmente nos registros) e com base teórica (nada deve ser suposto
  sem base). Seja sempre direto, claro, preciso e principalmente brutalmente honesto.

  Alguns parâmetros como category, voce mesmo pode definir um que seja adequado para registros, ou um já existente para o caso.
`

export const tools = { 
  getWalletBallance: tool({
    description: "Captura o saldo atual na carteira do usuário",
    inputSchema: z.object({}),
    execute: async () => getWalletBalance(),
  }),
  registerTransaction: tool({
    description: "Registra uma transação do usuário, do tipo in (ganho) ou out (gasto).",
    inputSchema: registerTransactionInputSchema,
    execute: async (rawInput: unknown) => registerTransaction(rawInput),
  })
}

export const modelConfig = {
  model: groq("llama-3.3-70b-versatile"),
  system,
  tools,
  stopWhen: [isLoopFinished(), stepCountIs(10)],
}