const fs = require('fs');
const path = require('path');


const secretFolder = path.join(__dirname, 'secret-folder');


fs.readdir(secretFolder, { withFileTypes: true }, (err, files) => {
    
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      let filePath = path.join(secretFolder, `${file.name}`);
      const extension = path.parse(filePath).ext.slice(1);
      const name = path.parse(filePath).name;
      fs.stat(filePath , (_, stat) => {
        if (stat.isFile()) {
          console.log(`${name} - ${extension} - ${stat.size}byte`);
        }
      });
    });
  }
});
          

        



  