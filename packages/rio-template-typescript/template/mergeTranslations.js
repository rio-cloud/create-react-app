/* eslint-env node */
/* eslint-disable no-console, curly */
const fs = require('fs');
const path = require('path');

const basePath = './src/features/translations';
const tempFolder = `${basePath}/temp`;
const targetFolder = basePath;

const tempDir = path.resolve(__dirname, tempFolder);
const targetDir = path.resolve(__dirname, targetFolder);

const getLocalesMap = files => {
    const localesMap = new Map();
    files.map(file => {
        const locale = file.split('.')[1];
        const storedLocale = localesMap.get(locale);
        const matchingfiles = storedLocale ? [...storedLocale, file] : [file];
        localesMap.set(locale, matchingfiles);
    });
    return localesMap;
};

const readDir = dir =>
    new Promise((resolve, reject) => fs.readdir(dir, (err, files) => (err ? reject(err) : resolve(files))));

const readFile = filePath =>
    new Promise((resolve, reject) => fs.readFile(filePath, 'utf8', (err, data) => (err ? reject(err) : resolve(data))));

const writeFile = (filePath, content) =>
    new Promise((resolve, reject) => fs.writeFile(filePath, content, 'utf8', err => (err ? reject(err) : resolve())));

const getJsonFileContent = async file => JSON.parse(await readFile(`${tempDir}/${file}`));

const mergeByLocale = async (locale, localesMap) => {
    const filesToMerge = localesMap.get(locale);
    const mergedContent = await Promise.all(filesToMerge.map(getJsonFileContent));

    let fileContent = {};
    mergedContent.map(item => {
        fileContent = { ...fileContent, ...item };
    });

    const targetFile = `${targetDir}/${locale}.json`;
    console.log(`Write file: ${targetFile}`);
    //console.log(fileContent);

    writeFile(targetFile, JSON.stringify(fileContent, null, 4));
};

(async () => {
    const tempFiles = await readDir(tempDir);

    const localesMap = getLocalesMap(tempFiles);
    const localesList = Array.from(localesMap.keys());

    localesList.map(locale => mergeByLocale(locale, localesMap));
})();
