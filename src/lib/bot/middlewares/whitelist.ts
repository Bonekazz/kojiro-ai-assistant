const usersWhitelistRaw = process.env.USERS_WHITELIST || '';
const USERS_WHITELIST: number[] = usersWhitelistRaw
  .split(',')
  .map(id => parseInt(id.trim(), 10))
  .filter(id => !isNaN(id)); // Remove possíveis sujeiras ou espaços vazios

// Whitelist middleware
export function usersWhitelistMiddleware(ctx: any, next: any) {
  const userId = ctx.from?.id;

  if (userId && USERS_WHITELIST.includes(userId)) {
    ctx.reply('❌ Acesso negado. Você não tem permissão para usar este bot.');
    return;
  }
  return next();
}