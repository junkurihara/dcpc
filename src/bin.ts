#!/usr/bin/env node

import childProcess from 'child_process';
import path from 'path';
const execSync = childProcess.execSync;

const cmdPattern =
  '  start\n' +
  '  stop\n' +
  '  restart\n';

const argv = process.argv.slice(2);
if (argv == null || argv.length < 1) {
  throw new Error('Choose a command\n' + cmdPattern);
}

const start = path.resolve(__dirname, '../dist/bin.start.js');
const stop = path.resolve(__dirname, '../dist/bin.stop.js');
const forever = path.resolve(__dirname, '../node_modules/.bin/forever');

const opt = '-l /var/log/dcpc.log -a';

const map: object = {
  restart: `"${forever}" restart ${opt} "${start}"`,
  start: `"${forever}" start ${opt} "${start}"`,
  stop: `"${forever}" stop ${opt} "${start}"`,
};

// @ts-ignore
const cmdTarget = map[argv[0]];
if (cmdTarget == null) {
  throw new Error('No such command\n' + cmdPattern);
}

let args = '';
if (argv.length > 1) {
  args = ' ' + argv.slice(1)
    .join(' ');
}

const res = execSync(cmdTarget + args).toString();
console.log(res);
