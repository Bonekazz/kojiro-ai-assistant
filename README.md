# Kojiro AI Assistant

Este projeto é um bot financeiro pessoal que registra gastos e receitas em uma base de dados. O objetivo é permitir que você escreva mensagens naturais como "acabei de comprar um lanche e custou 15 reais" e deixe o bot extrair automaticamente os dados financeiros.

## O que ele faz

- Recebe mensagens de texto no Telegram
- Usa IA para extrair dinamicamente valores, tipo de transação e descrição
- Armazena a transação no banco de dados
- Retorna o saldo atualizado

## Como funciona

1. O bot recebe a mensagem do usuário.
2. A mensagem é enviada para o modelo inteligente configurado.
3. O modelo gera um objeto conforme o schema de transação definido em `registerTransactionInputSchema`.
4. A transação é salva usando Prisma + SQLite.
5. O bot responde com o saldo atualizado.

## Principais bibliotecas e ferramentas

- `grammy`: framework para bots do Telegram
- `ai`: integração com IA para geração e extração de texto
- `@ai-sdk`: suporte a consultas e moldes inteligentes de saída
- `zod`: validação estrutural de dados
- `prisma` / `@prisma/client`: ORM para modelar e acessar o banco de dados
- `better-sqlite3`: banco SQLite rápido e leve
- `tsx` e `typescript`: execução e tipagem em desenvolvimento

## Estrutura de dados

O projeto usa Prisma com SQLite. O esquema `prisma/schema.prisma` define:

- `Category`
- `Transaction`

Cada transação armazena descrição, valor, tipo (`in` ou `out`) e categoria.

## Instalação

1. Clone o projeto

```bash
git clone <repo-url> koj iro-ai-assistant
cd koj iro-ai-assistant
```

2. Instale as dependências

```bash
npm install
```

3. Gere o cliente Prisma (se for necessário)

```bash
npx prisma generate
```

4. Aplique as migrações do Prisma

```bash
npx prisma migrate deploy
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
TG_BOT_TOKEN=seu_token_do_telegram
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=sua_chave_de_api_ou_variavel_de_ambiente_da_ia
USERS_WHITELIST=123456,789111
```

> Ajuste `OPENAI_API_KEY` conforme o provedor de IA que você estiver usando. O projeto já importa `dotenv/config` em `src/main.ts`.

## Execução

- Modo desenvolvimento:

```bash
npm run dev
```

- Build e execução de produção:

```bash
npm run build
npm start
```

- Testes:

```bash
npm test
```

## Uso

Depois de iniciar o bot, envie uma mensagem como:

- `Acabei de comprar um lanche e custou 15 reais`
- `Recebi 500 reais de salário`
- `Gastei 40 reais em gasolina`

O bot tentará extrair o valor e registrar a transação automaticamente.

## Observações

- O middleware de `whitelist` controla quais usuários podem usar o bot.

---

Pronto para usar: o bot transforma anotações manuais em entradas financeiras automáticas com suporte a IA e persistência local.

*Este README foi gerado com ajuda de IA.*