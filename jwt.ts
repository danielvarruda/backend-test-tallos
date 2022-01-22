const base64Url = require('base64url');

const header = {
    alg: 'HS256',
    typ: 'JWT',
};

const payload = {
    name: 'Daniel Arruda',
    username: 'arruda.daniel20@gmail.com',
    role: 'admin',
    exp: new Date().getTime(),
};

const headerEncoded = base64Url.encode(JSON.stringify(header));
const payloadEncoded = base64Url.encode(JSON.stringify(payload));

const key = 'test2k21tallosNeMDb';

const crypt = require('crypto');

const signature = crypt
  .createHmac('sha256', key)
  .update(`${headerEncoded}.${payloadEncoded}`)
  .digest('bin');

console.log(`${headerEncoded}.${payloadEncoded}.${base64Url.encode(signature)}`);