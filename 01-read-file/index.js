const path = require('path');
const fs = require('fs');
const doc = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(doc, 'utf-8');
let data = '';

stream.on('data', (chunk) => data += chunk);
stream.on('end', () => console.log(data));