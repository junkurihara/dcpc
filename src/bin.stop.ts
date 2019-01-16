#!/usr/bin/env node

import DNSCrypt from './dnscrypt-proxy';
import lib from './index';

const dnscrypt: DNSCrypt = new lib.DNSCryptProxy({});

dnscrypt.stop_dnscrypt();
