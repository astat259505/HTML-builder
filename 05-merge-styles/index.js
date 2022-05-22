const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');

const sourcePath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist');
const generalStyles = path.join(destPath, 'bundle.css');


async function isFile(path) {
  let result = await fsp.stat(path);
  return result.isFile();
}





async function mergeStyles() {
  const files = await fsp.readdir(sourcePath);
    
  let validFiles = files.filter(file => {
    let filePath = path.join(sourcePath, `${file}`);
    let extension = path.parse(filePath).ext;
    let validFile = isFile(filePath);
    return (validFile && extension === '.css');
  });
    
  let data = '';
  validFiles.forEach(file => {
    let filePath = path.join(sourcePath, `${file}`);
    let readStream = fs.createReadStream(filePath, 'utf-8');
    let writeStream = fs.createWriteStream(generalStyles);
    readStream.on('data', chunk => {
      data += `${chunk}\n`;
      writeStream.write(data);
    });

  });
}

 

mergeStyles();