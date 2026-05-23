import { Bot, Context } from "grammy";
import "dotenv/config";

import { generateText, Output } from "ai";

import { modelConfig } from "@/lib/agent/agent";
import { usersWhitelistMiddleware } from "@/lib/bot/middlewares/whitelist";
import { getWalletBalance } from "./lib/finance/wallet/queries";
import { registerTransactionInputSchema } from "./lib/finance/transactions/schemas";
import { registerTransaction } from "./lib/finance/transactions/queries";

const TG_BOT_TOKEN=process.env.TG_BOT_TOKEN;

if (!TG_BOT_TOKEN) {
  throw new Error("O token do bot não foi definido no arquivo .env");
}

// O grammY infere os tipos automaticamente
const bot = new Bot(TG_BOT_TOKEN);

// middlewares
bot.use(usersWhitelistMiddleware);

// Comando /start
bot.command("balance", async (ctx: Context) => {
  await ctx.reply(`Balance: R$ ${(await getWalletBalance()).toFixed(2).replace(".", ",")}`);
});

// Ouvindo mensagens de texto
bot.on("message:text", async (ctx: Context) => {
  const textInput = ctx.message?.text;

  if (!textInput) {
    return await ctx.reply("Desculpe, não consegui entender sua mensagem.");
  }

  const { output } = await generateText({
    prompt: textInput,
    output: Output.array({
      element: registerTransactionInputSchema
    }),
    ...(modelConfig)
  });

  // console.log("> OUTPUT: ", output);

  const result = await registerTransaction(output);

  await ctx.reply((result.sucess && `Precessado com sucesso. Saldo atual: R$ ${(await getWalletBalance()).toFixed(2)}`) 
  || "Erro ao processar operação" , {
    parse_mode: 'Markdown',
    // reply_markup: inlineKeyboard, // Adiciona os botões aqui
  });
});

// Tratamento de erros
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Erro na atualização ${ctx.update.update_id}:`, err.error);
});

console.log("🤖 Bot em TypeScript iniciado...");
bot.start();