// import nacl from 'ecma-nacl';
const nacl = require('ecma-nacl');

const parseNumber = (s) => parseInt(s, 10);

const hexToUint8Array = (hex) => {
    const hexWithoutPrefix = hex.startsWith('0x') ? hex.slice(2) : hex;
    const subStrings = [];
    for (let i = 0; i < hexWithoutPrefix.length; i += 2) {
        subStrings.push(hexWithoutPrefix.substr(i, 2));
    }
    return new Uint8Array(subStrings.map(s => parseInt(s, 16)));
};

let valueBytes = hexToUint8Array(
    '0000000000000000000000000000000000000000000000000000000000000000'
);
const secretBytes = hexToUint8Array(
    'ebe044bec1031e8e2fa494620dce3e50111a9f5336c358dc08d4d785e4c62ead'
);
const randomBytes = hexToUint8Array(
    '75c5d37dd6b51cc6b69ab1003993ac8a05d2abb94851f4bd'
);

const num = parseNumber(process.argv[2]);
const encryptor = nacl.secret_box.formatWN.makeEncryptor(secretBytes, randomBytes);
const startDate = Date.now();
for (let i = 0; i < num; i++) {
    valueBytes = encryptor.pack(valueBytes);
}
const elapsed = Date.now() - startDate;
console.log(`Number of iterations: ${num}, elapsed: ${elapsed} msec, avg: ${elapsed / num} msec`);
