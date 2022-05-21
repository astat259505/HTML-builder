const fsp = require('fs/promises');
const path = require('path');
const fs = require('fs');

const sourceFile = path.join(__dirname, 'files');
const destFile = path.join(__dirname, 'files-copy');




async function copyDir() {
 
  await fsp.mkdir(destFile, { recursive: true });
    
  const files = await fsp.readdir(sourceFile);
  files.forEach(file => {
    let sourcePath = path.join(sourceFile, `${file}`);
    let destPath = path.join(destFile, `${file}`);
    fs.copyFile(sourcePath, destPath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  const  copiedFiles = await fsp.readdir(destFile);
  let needToDel = copiedFiles.filter(copiedFile => !files.includes(copiedFile));
  needToDel.forEach(deleteFile => {
    fs.unlink(path.join(destFile, `${deleteFile}`), err => {
      if (err) {
        console.log(err);
      }
    });
  });
       

}

copyDir();


