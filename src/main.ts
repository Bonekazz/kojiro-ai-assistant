import { Bot, Context, InlineKeyboard } from "grammy";
import "dotenv/config";

import { generateText, isLoopFinished, stepCountIs, tool } from "ai";
import { createGroq } from '@ai-sdk/groq';
import {
  getWalletBalance,
} from "./lib/finance/queries/wallet.js";

import { z } from "zod";
import { db } from "./db/db.js";
import { categories, transactions } from "./db/schema.js";
import { eq } from "drizzle-orm";
import { systemPrompt } from "./lib/agent/agent.js";

const TG_BOT_TOKEN=process.env.TG_BOT_TOKEN;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!TG_BOT_TOKEN) {
  throw new Error("O token do bot não foi definido no arquivo .env");
}

if (!GROQ_API_KEY) {
  throw new Error("Groq api key not defined in .env");
}

const groq = createGroq({
  apiKey: GROQ_API_KEY,
});

// O grammY infere os tipos automaticamente
const bot = new Bot(TG_BOT_TOKEN);

// Comando /start
bot.command("start", async (ctx: Context) => {
  await ctx.reply("Olá! Agora sou um bot moderno rodando puramente em TypeScript!");
});

// Ouvindo mensagens de texto
bot.on("message:text", async (ctx: Context) => {
  const textInput = ctx.message?.text;

  if (!textInput) {
    return await ctx.reply("Desculpe, não consegui entender sua mensagem.");
  }

  await ctx.reply(`Você digitou: ${textInput}`);

  const inlineKeyboard = new InlineKeyboard()
    .text('📊 Ver Extrato', 'view_report')

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    system: systemPrompt,
    prompt: textInput,
    stopWhen: [isLoopFinished(), stepCountIs(10)],
    tools: {
      getWalletBallance: tool({
        description: "Captura o saldo atual na carteira do usuário",
        inputSchema: z.object({}),
        execute: async () => getWalletBalance(),
      }),
    },
  })

  await ctx.reply(text, {
    parse_mode: 'Markdown',
    reply_markup: inlineKeyboard, // Adiciona os botões aqui
  });
});

// Tratamento de erros
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Erro na atualização ${ctx.update.update_id}:`, err.error);
});

console.log("🤖 Bot em TypeScript iniciado...");
bot.start();