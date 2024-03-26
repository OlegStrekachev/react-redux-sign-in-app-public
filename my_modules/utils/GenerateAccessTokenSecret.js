import crypto from 'crypto';

 function generateAccessTokenSecret(length = 256) {
    return crypto.randomBytes(length).toString('hex');
}

const secret = generateAccessTokenSecret();

console.log(secret);


