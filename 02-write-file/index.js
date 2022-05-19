const { stdin: input, stdout: output } = process;
const fs = require('fs');
const path = require('path');


const document = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(document);

output.write('Write something\n');
input.on('data', chunk => {
  if (chunk.toString().trim() === 'exit') {
    process.exit();
  } else {
    writeStream.write(chunk);
  }
});

process.on('exit', () => output.write('Thank you!'));
process.on('SIGINT', () => {
    process.exit()
});