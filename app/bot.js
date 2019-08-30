const TelegramBot = require('node-telegram-bot-api');
const set = require('./settings');

const bot = new TelegramBot(set.bot.token, { polling: true });

bot.onText(/\/echo (.+)/, (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;
  let message = '( ( ( echoes ) ) )';
  bot.sendMessage(chatId, message, { parse_mode: "HTML" });
});

bot.onText(/\/hey/, (msg) => {
  const chatId = msg.chat.id;
  let message = `Hola ${msg.chat.first_name}\nTu id de Telegram es: ${chatId}`;
  bot.sendMessage(chatId, message, { parse_mode: "HTML" });
});

const send_news = (message) => {
  return bot.sendMessage(set.bot.id_receptor, message, { parse_mode: "HTML" });
}  

module.exports = { send_news };