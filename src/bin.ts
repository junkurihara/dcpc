#!/usr/bin/env node

import childProcess from 'child_process';
const execSync = childProcess.execSync;

const cmdPattern =
  '  start\n' +
  '  stop\n' +
  '  restart\n';

const argv = process.argv.slice(2);
if (argv == null || argv.length < 1) {
  throw new Error('Choose a command\n' + cmdPattern);
}

const dir = 'node_modules/dcpc/'; // ''
const map: object = {
  restart: `node ${dir}dist/bin.stop.js; forever restart ${dir}dist/bin.start.js`,
  start: `forever start ${dir}dist/bin.start.js`,
  stop: `forever stop ${dir}dist/bin.start.js; node ${dir}dist/bin.stop.js`,
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
