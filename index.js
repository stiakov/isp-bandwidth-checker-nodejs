const set = require('./settings.js');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(set.db_name);
const db = low(adapter);
db.defaults({ registers: [], count: 0 }).write();

const execSync = require('child_process').execSync;

const check_bandwidth = (random_timer = (Math.round(Math.random() * 11) + 1) * 60000) => {
  
  setTimeout(() => {
    const date_time = new Date().toLocaleString(set.lang, set.timezone);
    const stdout = execSync(set.speedtest_json, set.encoding);
    const result = JSON.parse(stdout);
    const finish_time = new Date().toLocaleString(set.lang, set.timezone);
    
    db.get('registers')
    .push(set.asset(result, date_time, finish_time)).write();
    
    db.update('count', n => n + 1).write();
    
  }, random_timer);
};

try {
  check_bandwidth(0);
  setInterval(check_bandwidth, 24 * 60000);
  
} catch (error) {
  execSync('echo $(date) >> error.log', set.encoding);
  execSync('echo $error >> error.log', set.encoding);
}
