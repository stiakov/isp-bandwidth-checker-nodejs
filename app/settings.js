const settings = {
  db_name: 'db.json',
  lang: 'es-CO',
  timezone: { timezone: 'America/Bogota' },
  encoding: { encoding: 'utf-8' },

  speedtest: {
    json: 'speedtest-cli --json',
    csv: 'speedtest-cli --csv',
    simple: 'speedtest-cli --simple',
  },

  bot: {
    token: 'USE:YOUR:OWN:BOT:TOKEN',
    id_receptor: 446364123,   // SET YOUR OWN ID
  },

  time: {                     // Expressed in minutes
    allow_random: true,       // If it's false, random_margin will be zero by default
    interval: 27,
    random_margin: 4,
  },

  get_time: () => {
    const lang = 'es-CO';
    const timezone = { timezone: 'America/Bogota' };
    return new Date().toLocaleString(lang, timezone);
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
  }
}

module.exports = settings;