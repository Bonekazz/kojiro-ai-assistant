import { createGoogleGenerativeAI } from "@ai-sdk/google";


const googleConfig = { 
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  GOOGLE_API_MODEL: process.env.GOOGLE_API_MODEL,
}

const { GOOGLE_API_KEY, GOOGLE_API_MODEL } = googleConfig;

if (!GOOGLE_API_KEY || !GOOGLE_API_MODEL ) {
  throw new Error(`Google variables wrongly configured: ${JSON.stringify(googleConfig, null, 2)}`);
}

const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_API_KEY,
});

export const system =`
  VOCE É UM ASSISTENTE FINANCEIRO. SUA FUNÇÃO É EXTRAIR DADOS DA MENSAGEM DO USUÁRIO
  E GERAR UM OU MAIS OBJETOS PARA OUTPUT.
  Exemplos de input do usuário: "Comprei 5 reais de pão", "comprei um café de 2,50", "peguei 80,00 emprestado da minha mãe".
`

export const modelConfig = {
  // model: google("gemini-3.1-flash-lite"),
  model: google(GOOGLE_API_MODEL),
  system,
}