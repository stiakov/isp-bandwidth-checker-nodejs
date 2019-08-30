const settings = {
  db_name: 'db/my_db.json',
  lang: 'es-CO',
  timezone: {timezone: 'America/Bogota'},
  encoding: {encoding: 'utf-8'},

  speedtest: {
    json: 'speedtest-cli --json',
    csv: 'speedtest-cli --csv',
    simple: 'speedtest-cli --simple',
  },

  bot: {
    token: '708473151:AAHcUCE3dE2cm22ZSarAActM9DJY8RKi6nI',
    id_receptor: 446364123,    // SET YOUR OWN ID
  },

  timer: {                     // Expressed in minutes
    allow_random: true,        // If it's false, random_margin will be zero by default
    interval: 30,
    random_margin: 2,
    random_generator: (value) => {
      return Math.ceil(Math.random() * value) * 60000;
    }
  },

  get_time: () => {
    return new Date().toLocaleString(this.lang, this.timezone);
  },

  asset: (result, date_time, finish_time) => {
    return {
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
    };
  },
  daemon_str: `

|)/\\[-|\\/|()|\\| |_\\~ /\\(~|~|\\/[- 
-> https://github.com/stiakov <-

`
};

module.exports = settings;