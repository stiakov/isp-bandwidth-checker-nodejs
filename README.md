# Bandwidth Checker and Logger
It's a bandwidth monitor daemon built upon JS instructions, it's intended to run periodically and saves the results in a json file.

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
- Install **[PM2](http://pm2.keymetrics.io/)** globally: `npm install -g pm2`

- Install **[LowDB](https://github.com/typicode/lowdb)**: Run `npm install` from the terminal, it makes use of the *package.json* in the source directory or if you prefer, follow the instructions from the provided link.

---

## Settings
The *settings.js* module is offered to customize the arguments passed in the *index.js* functions, so you should customize the module to fits it to your needs.

---

## Execution
Check that your system accomplish the requirements and everything works perfectly.
There are two ways to run this script as a daemon.

From the console:
- If you are in the source path, run: `npm run daemon`
- From anywhere, replace the path and run: `pm2 start your/path/to/index.js`

---

## Issues
Please help me tracking any issue that could appear, feel free to fork and send a pull request, comment, review, or report an issue on this repo.

---
## To do
- [ ] Implement a GUI to visualize and explore the data collected.
- [ ] Deploy on my own server and make it accesible from the web.
- [ ] Implement a telegram bot to notify relevant changes in data.
---

### Credits
This project was inspired by [@healycodes](https://github.com/healeycodes) and his recent work. It was recently published on [Dev.to](https://dev.to/healeycodes/i-built-a-bot-to-try-and-get-money-back-from-my-internet-provider-33ip).

