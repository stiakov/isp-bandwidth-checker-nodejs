# Bandwidth Checker and Logger
It's a bandwidth monitor built upon JS instructions,  it's intended to run periodically and saves the results in a json file.

It makes use of:
- **lowdb** as a lite db in json format.
- **speedtest-cli** to run the speed tests from the command line.
- **pm2** process manager to run this script as a daemon system.
---
If you work with multiple projects and different development environments, I endorse you to use *versioning manager systems* like [NVM](https://github.com/nvm-sh/nvm) for NodeJS, [PYENV](https://github.com/pyenv/pyenv) for Python, [RBENV](https://github.com/rbenv/rbenv) for Ruby and others to easily handle and switch among different versions of your favorite programming languages and its development backgrounds.

## Requirements
- Latest version of **[NodeJS](https://nodejs.org/en/)** 
*-- (npm included)*

- Latest version of **[Python](https://www.python.org/)** *-- (pip included)*


---
## Installation
- Install **[SpeedTest-cli](https://github.com/sivel/speedtest-cli)**: `pip install speedtest-cli`
- Install **[PM2]()** globally: `npm install -g pm2`

- Install **[LowDB](https://github.com/typicode/lowdb)**: Run `npm install` from the terminal, it makes use of the *package.json* in the source directory or if you prefer, follow the instructions from the provided link.
