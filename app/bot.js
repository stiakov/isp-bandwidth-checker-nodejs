const TelegramBot = require('node-telegram-bot-api');
const cli = require('./command_line');
const set = require('./settings');
const db = require('./db_init');

const my_bot = new TelegramBot(set.bot.token, {polling: true});

const send_data = (dest_id, message, format = {parse_mode: 'HTML'}) => {
  my_bot.sendMessage(dest_id, message, format)
    .then((success, error) => {
      if (error) cli.log_errors(error);
    });
};

my_bot.onText(/\/options/, (msg) => {
  my_bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
      "keyboard": [['SpeedTest ⏱', "Which IP 🔍"], ["Telegram 🆔", '💊']]
    }
  });
});

my_bot.on('message', (msg) => {
  if (msg.text.toString().toLowerCase().includes('speedtest')) {
    my_bot.sendMessage(msg.chat.id, "Running test, wait a moment")
      .then(success => {
        console.log('speedtest is running');
        let speed = cli.run(set.speedtest.simple);
        send_data(msg.chat.id, speed);
      });
  }
  if (msg.text.toString().toLowerCase().includes('ip')) {
    let ip = db.getSample();
    console.log('sending IP');
    send_data(msg.chat.id, `Server IP: ${ip[0].client.ip}`);
  }
  if (msg.text.toString().toLowerCase().includes('id')) {
    const chatId = msg.chat.id;
    const message = `Your Telegram ID is: ${chatId}`;
    send_data(msg.chat.id, message);
  }
  if (msg.text === '💊') {
    const message = `Hey ${msg.chat.first_name}, don't forget to take your pills`;
    send_data(msg.chat.id, message);
  }
});

const bot = {
  send_news: (message) => {
    return send_data(set.bot.id_receptor, message);
  }
};

module.exports = bot;