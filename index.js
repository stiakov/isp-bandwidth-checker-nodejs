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
    .push({
      download: result['download'] / 1048576,
      upload: result['upload'] / 1048576,
      server: {
        url: result['server']['url'],
        name: result['server']['name'],
        country: result['server']['country'],
        latency: result['server']['latency']
      },
      timestamp: result['timestamp'],
      client: {
        ip: result['client']['ip'],
        isp: result['client']['isp'],
        isprating: result['client']['isprating']
      },
      local_date: date_time.split(', ')[0],
      local_time: date_time.split(', ')[1],
      finish_time: finish_time.split(', ')[1]
    }).write();
    
    db.update('count', n => n + 1).write();
    
  }, random_timer);
};

try {
  check_bandwidth(0);
  setInterval(check_bandwidth, 24 * 60000);
  
} catch (error) {
  execSync('echo $error >> error.log', set.encoding);
}
