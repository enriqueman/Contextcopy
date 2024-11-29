const fs = require('fs');
const path = require('path');

function listFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      fileList.push({ type: 'directory', name: filePath });
      listFiles(filePath, fileList);
    } else {
      fileList.push({ type: 'file', name: filePath });
    }
  });

  return fileList;
}

const directoryPath = path.join(__dirname, 'sam-backend'); // Cambia 'src' por el nombre de tu carpeta principal
const fileList = listFiles(directoryPath);

fileList.forEach((file) => {
  console.log(`${file.type}: ${file.name}`);
});
