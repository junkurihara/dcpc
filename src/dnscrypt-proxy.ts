/**
 * dnscrypt-proxy.ts
 */

import child_process from 'child_process';
import path from 'path';

const name: string = 'dnscrypt proxy';
// const icns: string = ''; // icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)

export default class {
  private config: object;
  private readonly binary: string;
  private readonly cfgFile: string;

  constructor(config: object) {
    this.config = config;
    this.cfgFile = '';
    this.binary = '';

    const platform: string | undefined = process.platform;
    const arch: string | undefined = process.arch;

    switch (platform) {
      case 'darwin': {
        this.binary = path.resolve(__dirname, '../lib/darwin/dnscrypt-proxy');
        this.cfgFile = path.resolve(__dirname, '../config/dnscrypt-proxy_darwin.toml');
        break;
      }
      case 'linux': {
        this.cfgFile = path.resolve(__dirname, '../config/dnscrypt-proxy_linux.toml');
        if (arch === 'x64') {
          this.binary = path.resolve(__dirname, '../lib/linux-x86_64/dnscrypt-proxy');
        } else {
          throw new Error('Unsupported architecture');
        }
        break;
      }
      default: {
        throw new Error('Unsupported platform');
      }
    }
  }

  public start_dnscrypt() {
    const options = { name }; // or {name, icns}
    const cmd = `"${this.binary}" -config "${this.cfgFile}"`;
    // const options: string[] = ['-config', `"${this.cfgFile}"`];
    // const cmd = `"${this.binary}"`;
    return this.sexec(cmd, options);
  }

  // todo: this daemonize function should not be sudo?
  private sexec(cmd: string, options: object) {
    return new Promise( (resolve, reject) => {
      // child_process.execFile(cmd, options, (error: any, stdout: any, stderr: any) => {
      child_process.exec(cmd, options, (error: any, stdout: any, stderr: any) => {
          if (error) { reject(error); }
          resolve({stdout, stderr});
        },
      );
    });
  }
}
