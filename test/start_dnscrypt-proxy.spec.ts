import chai from 'chai';
import DNSCrypt from '../src/dnscrypt-proxy';
import * as lib from '../src/index';
const expect = chai.expect;

describe('Test skeleton', () => {
  it('Test 1', () => {

    const dnscrypt: DNSCrypt = new lib.DNSCryptProxy({});

    dnscrypt.start_dnscrypt();

  });

});
