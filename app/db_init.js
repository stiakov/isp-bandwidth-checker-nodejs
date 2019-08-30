const set = require('./settings');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(set.db_name);
const db_set = low(adapter);
db_set.defaults({ registers: [], count: 0 }).write();

const db = {
  getCount: () => db_set.get('count').value(),
  getAll: () => db_set.get('registers').value(),
  getSample: (idx) => db_set.get('registers').slice(idx - 2, idx).value(),
  push: (data) => {
    db_set.get('registers').push(data).write();
    db_set.update('count', n => n + 1).write();
  }
};

module.exports = db;