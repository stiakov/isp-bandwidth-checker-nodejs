# Bandwidth Checker
It's a bandwidth monitor that is intended to run periodically and saves the results in a json file as a DB.

It makes use of:
- **lowdb** as a lite db in json format.
- **speedtest-cli** to run the speed tests from the command line.
- **pm2** process manager to run this script as a daemon system.

 

