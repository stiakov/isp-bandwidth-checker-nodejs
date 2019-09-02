const cli = require('./command_line');
const set = require('./settings');
const db = require('./db_init');
const bot = require('./bot');

const check_ip = () => {
  const size = db.getCount();

  if (size > 1) {
    const array = db.getSample(size);
    const old_ip = array[0].client.ip;
    const new_ip = array[1].client.ip;

    if (old_ip !== new_ip) {
      const message = `Your IP has changed\nfrom <em>${old_ip}</em>\nto <b>${new_ip}</b>`;
      bot.send_news(message);
    }
  }
};

const check_bandwidth = (init_boot = false) => {
  let rand_timeout;

  if (init_boot || !set.timer.allow_random) {
    rand_timeout = 0;
  } else {
    rand_timeout = set.timer.random_generator(set.timer.random_margin);
  }

  setTimeout(() => {
    // COMMENT THE BELOW COMMANDS FOR TESTING PURPOSES
    const date_time = set.get_time();
    const result = JSON.parse(cli.run(set.speedtest.json));
    const finish_time = set.get_time();
    db.push(set.asset(result, date_time, finish_time));

    // TESTING COMMANDS
    // const stdout = cli.run('echo $(date)');
    // bot.send_news(stdout);
    check_ip();

  }, rand_timeout);

};

const start = () => {
  try {
    console.log(set.daemon_str);
    check_bandwidth(true);
    setInterval(check_bandwidth, set.timer.interval * 60000);
  } catch (error) {
    cli.log_errors(error);
  }
};

module.exports = start;
