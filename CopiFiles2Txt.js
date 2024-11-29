const fs = require('fs');
const path = require('path');

//Comprobar ruta es un directorio
function isDirectory(source) {
    return fs.lstatSync(source).isDirectory();
}

//Devolver una lista de archivos y directorios, excluyendo node_modules
function getFilesRecursively(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        if (isDirectory(filePath)) {
            if (file !== 'node_modules') {
                results = results.concat(getFilesRecursively(filePath));
            }
        } else {
            results.push(filePath);
        }
    });
    return results;
}

//Procesar los archivos y escribir los resultados en un archivo
function processFilesAndSave(rootDir, outputFile) {
    const filePaths = getFilesRecursively(rootDir);
    let outputData = '';

    filePaths.forEach((filePath) => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            outputData += `//${filePath}\n\n${content}\n\n`;
        } catch (err) {
            console.error(`Error reading file: ${filePath}`, err);
        }
    });

    try {
        fs.writeFileSync(outputFile, outputData, 'utf8');
        console.log(`Información guardada en: ${outputFile}`);
    } catch (err) {
        console.error(`Error escribiendo en el archivo: ${outputFile}`, err);
    }
}

// Especificar la carpeta raíz y el archivo de salida
const rootDirectory = path.resolve(__dirname, './src');
const outputFilePath = path.resolve(rootDirectory, 'informacion_archivos.txt');

// Iniciar el proceso
processFilesAndSave(rootDirectory, outputFilePath);