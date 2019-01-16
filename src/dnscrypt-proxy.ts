/**
 * dnscrypt-proxy.ts
 */

import sudo from 'sudo-prompt';

const name: string = 'dnscrypt proxy';
// const icns: string = ''; // icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)

export default class {
  private config: object;
  constructor(config: object) {
    this.config = config;
  }

  public start_dnscrypt() {
    const options = { name }; // or {name, icns}
    const platform: string|undefined = process.platform;
    const arch: string|undefined = process.arch;
    let cmd;
    switch (platform) {
      case 'darwin': {
        cmd = './lib/macos/dnscrypt-proxy -config ./config/dnscrypt-proxy_darwin.toml';
        break;
      }
      case 'linux': {
        if (arch === 'x64') {
          cmd = './lib/linux-x86_64 -config ./config/dnscrypt-proxy_linux.toml';
        } else {
          throw new Error('Unsupported architecture');
        }
        break;
      }
      default: {
        throw new Error('Unsupported platform');
      }
    }
    sudo.exec(cmd, options, (error: Error, stdout: any, stderr: any) => {
        if (error) { throw error; }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
      },
    );
  }

  public stop_dnscrypt() {
    const options = { name }; // or {name, icns}
    sudo.exec('pgrep dnscrypt-proxy|xargs kill', options, (error: Error, stdout: any, stderr: any) => {
        if (error) { throw error; }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
      },
    );
  }
}
