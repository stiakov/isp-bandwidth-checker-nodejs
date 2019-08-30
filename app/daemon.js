const set = require('./settings');
const db = require('./db');
const { send_news } = require('./bot');

const execSync = require('child_process').execSync;

const check_ip = () => {
  console.log('check_ip triggered')
  const size = db.getCount();
  let array = []
  
  if (size > 1) {
    array = db.getSample(size);
  }
  
  const old_ip = array[0].client.ip
  const new_ip = array[1].client.ip
  
  if (old_ip !== new_ip) {
    let message = `Your IP has changed\nfrom <em>${old_ip}</em>\nto <b>${new_ip}</b>`;
    send_news(message);
  }
} 

const check_bandwidth = (init_boot = false) => {
  let rand_timeout = set.time.random_margin;
  
  if (init_boot) rand_timeout = 0;
  
  if (set.time.allow_random && rand_timeout !== 0) {
    rand_timeout = (Math.round(Math.random() * rand_timeout) + 1) * 1000;
  }

  if (!set.time.allow_random) rand_timeout = 0

  setTimeout(() => {
    // Comment the below commands for testing purposes
    const date_time = set.get_time();
    const stdout = execSync(set.speedtest.json, set.encoding);
    const result = JSON.parse(stdout);
    const finish_time = set.get_time();
    db.pushRegister(set.asset(result, date_time, finish_time));
    
    // TESTING COMMANDS
    // const stdout = execSync('echo $(date)', set.encoding);
    // send_news(stdout);

    check_ip();
    
  }, rand_timeout);
  
};

const start = () => {
  try {
    console.log('Daemon is running');
    
    check_bandwidth(true);
    setInterval(check_bandwidth, set.time.interval * 1000);
    
  } catch (error) {
    console.log('Catchin errors: \n' + error);
    execSync('echo $(date) >> error.log', set.encoding);
    execSync(`echo ${error} >> error.log`, set.encoding);    
  }
}

module.exports = start;
