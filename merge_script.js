const fs = require('fs');

const arPath = 'local/ar.json';
const enPath = 'local/en.json';

const arJson = JSON.parse(fs.readFileSync(arPath, 'utf8'));
const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const extractedAr = JSON.parse(fs.readFileSync('extracted_ar.json', 'utf8'));
const extractedEn = JSON.parse(fs.readFileSync('extracted_en.json', 'utf8'));

// Instead of putting everything in the root, we can put it under a "missing" key or just root
if (!arJson.missing) arJson.missing = {};
if (!enJson.missing) enJson.missing = {};

Object.assign(arJson, extractedAr); 
Object.assign(enJson, extractedEn);

fs.writeFileSync(arPath, JSON.stringify(arJson, null, 2));
fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));

console.log('Merged successfully.');
