const path = require('path');
const fsp = require('fs/promises');
const fs = require('fs');


const projectDist = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');
const html = path.join(projectDist, 'index.html');
const assetsSource = path.join(__dirname, 'assets');
const assetsDest = path.join(projectDist, 'assets');
const sourceStyles = path.join(__dirname, 'styles')
const resultStyles = path.join(projectDist, 'style.css')

async function createHtml() {
  let readTemplate = await fsp.readFile(template, 'utf-8');
  const samples = readTemplate.match(/{{\w+}}/g);
 
  for (const sample of samples) {
    let htmlSrc = path.join(__dirname, 'components', `${sample.slice(2, -2)}.html`);
    let layout = await fsp.readFile(htmlSrc, 'utf-8');
     
    readTemplate = readTemplate.replace(sample, layout);
    

  }
  fsp.writeFile(html, readTemplate);
  
  
 
}
  


async function createDist() {
  
  await fsp.mkdir(projectDist, { recursive: true });
}




async function copyAssets(dest, source) {
  await fsp.rm(dest, {recursive: true, force: true});
  await fsp.mkdir(dest, { recursive: true });
  const files = await fsp.readdir(source, { withFileTypes: true });
  for (let file of files) {
    let sourcePath = path.join(source, `${file.name}`);
    let destPath = path.join(dest, `${file.name}`);
    if (file.isDirectory()) {
      await copyAssets(destPath, sourcePath);
    }
    else {
      
      await fsp.copyFile(sourcePath, destPath)
    }
          
   
  };
}

async function mergeStyles() {
  const files = await fsp.readdir(sourceStyles, { withFileTypes: true });
      
  let validFiles = files.filter(file => {
    let filePath = path.join(sourceStyles, `${file.name}`);
    let extension = path.parse(filePath).ext;
    let validFile = file.isFile();
    return (validFile && extension === '.css');
  });
      
  let data = '';
  validFiles.forEach(file => {
    let filePath = path.join(sourceStyles, `${file.name}`);
    let readStream = fs.createReadStream(filePath, 'utf-8');
    let writeStream = fs.createWriteStream(resultStyles);
    readStream.on('data', chunk => {
      data += `${chunk}\n`;
      writeStream.write(data);
    });
  
  });
}

  

createDist();
copyAssets(assetsDest, assetsSource);
createHtml();
mergeStyles()




