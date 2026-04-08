const fs = require('fs');
const cheerio = require('cheerio');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const ar = JSON.parse(fs.readFileSync('local/ar.json'));

let missingKeys = new Set();

function resolvePath(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let $ = cheerio.load(content);
    $('[data-i18n]').each((i, el) => {
        let key = $(el).attr('data-i18n');
        if (!resolvePath(ar, key)) {
            missingKeys.add(key);
        }
    });
});

console.log('Missing data-i18n keys:');
missingKeys.forEach(k => console.log(k));
