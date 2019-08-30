const set =  require('./settings');
const execSync = require('child_process').execSync;
const cli = {
  run: (command) => execSync(command, set.encoding),
  log_errors: (error) => {
    execSync(`echo $(date) >> logs/error.log`, set.encoding);
    execSync(`echo ${error} >> logs/error.log`, set.encoding);
    console.log(error);
  }
};

module.exports = cli;