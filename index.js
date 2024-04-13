const { Telegraf } = require("telegraf");
require("dotenv").config();
const express = require("express");
const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  const username = ctx.from.username;
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `Hey, @${username}👋\nWelcome to @crypto\nPlease click the button below to follow our socials.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Join our socials.",
              web_app: {
                url: process.env.FRONTEND_URL,
              },
            },
          ],
        ],
      },
    }
  );
});

// Listen for new chat members
bot.on("new_chat_members", (ctx) => {
  const newUser = ctx.message.new_chat_members[0];
  const username = newUser.username;

  ctx.reply(
    `Hey @${username}👋\nWelcome to the group!\nPlease click the link below to follow our socials`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Join our socials.",
              url: "https://crypto-mini-app.netlify.app",
            },
          ],
        ],
      },
    }
  );
});

// Set bot commands for Telegram
bot.telegram.setMyCommands([
  { command: "start", description: "Start the crypto welcome Bot" },
]);

bot.launch();
