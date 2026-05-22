import { Bot, Context } from "grammy";
import "dotenv/config";

import { generateText } from "ai";

import { modelConfig } from "@/lib/agent/agent";
import { usersWhitelistMiddleware } from "@/lib/bot/middlewares/whitelist";

const TG_BOT_TOKEN=process.env.TG_BOT_TOKEN;

if (!TG_BOT_TOKEN) {
  throw new Error("O token do bot não foi definido no arquivo .env");
}

// O grammY infere os tipos automaticamente
const bot = new Bot(TG_BOT_TOKEN);

// middlewares
bot.use(usersWhitelistMiddleware);

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

  // const inlineKeyboard = new InlineKeyboard()
  //   .text('📊 Ver Extrato', 'view_report')

  const { text, toolResults } = await generateText({
    messages: [{role: "user", content: textInput }],
    ...(modelConfig)
  });

  const resposta = toolResults?.[0]?.output ?? text;

  await ctx.reply(resposta as any || "Processado com sucesso!", {
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