# dcpc
A dnscrypt-proxy client for Node.js which enables blocking annoying ads at DNS level.

> This project is currently being developed on MacOS X Mojave and Ubuntu 18.10.
 
## Installation

```bash
$ yarn global install dcpc
```

## Usage

Start `dnscrypt-proxy` by the following command.
```bash
$ sudo dcpc start
```

Stop `dnscrypt-proxy` by the following command.

```bash
$ sudo dcpc stop
```

## Libraries

This project uses the following libraries and ad-block lists.

- `dnscrypt-proxy`: https://github.com/jedisct1/dnscrypt-proxy

- Domain list of 280 blocker: https://280blocker.net/files/280blocker_domain.txt
