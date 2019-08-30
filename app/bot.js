const TelegramBot = require('node-telegram-bot-api');
const cli = require('./command_line');
const set = require('./settings');

const my_bot = new TelegramBot(set.bot.token, {polling: true});

const send_data = (dest_id, message, format = {parse_mode: 'HTML'}) => {
  my_bot.sendMessage(dest_id, message, format)
    .then((success, error) => {
      if (error) cli.log_errors(error);
    });
};

my_bot.onText(/\/echo (.+)/, (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;
  let message = '( ( ( echoes ) ) )';
  send_data(chatId, message);
});

my_bot.onText(/\/hey/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.chat.first_name;
  const message = `Hey There ${name}!\nYour Telegram ID is: ${chatId}`;
  send_data(chatId, message);
});

const bot = {
  send_news: (message) => {
    return send_data(set.bot.id_receptor, message);
  }
};

module.exports = bot;