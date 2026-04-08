const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const arabicRegex = /[\u0600-\u06FF]/;
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let extractedAr = {};
let fileIndex = 0;

files.forEach(file => {
    let $ = cheerio.load(fs.readFileSync(file, 'utf8'));
    let modified = false;
    let pageName = path.basename(file, '.html');
    
    // Find all elements containing direct text
    $('*').each((i, el) => {
        let node = $(el);
        if (node.is('script') || node.is('style') || node.is('noscript')) return;
        
        let hasI18n = false;
        let curr = node;
        while (curr.length > 0 && curr[0].name !== 'html') {
            if (curr.attr('data-i18n')) {
                hasI18n = true;
                break;
            }
            curr = curr.parent();
        }
        
        if (hasI18n) return;

        // Check node's direct text children
        let textNodes = node.contents().filter(function() {
            return this.type === 'text' && arabicRegex.test(this.data);
        });

        if (textNodes.length > 0) {
            let key = `missing_${pageName}_${i}`;
            // If the element has mixed content (text and HTML tags), wrap the whole inner HTML?
            // Safer: if it has only text nodes and maybe br, or just text nodes, set data-i18n on the element.
            let containsHtml = node.children().length > 0;
            
            if (containsHtml) {
                // To avoid breaking inner tags like <i>, <span>, wrap text nodes in spans or just add data-i18n-html to parent.
                // But replacing innerHTML with translation might break icons if they are not in the translation string.
                // Let's just output it for manual or script-based translation.
                extractedAr[key] = node.html().trim();
                node.attr('data-i18n', key);
                node.attr('data-i18n-html', 'true');
                modified = true;
            } else {
                extractedAr[key] = node.text().trim();
                node.attr('data-i18n', key);
                modified = true;
            }
        }
    });

    if (modified) {
        fs.writeFileSync(file, $.html({ decodeEntities: false }));
        console.log('Modified ' + file);
    }
});

fs.writeFileSync('extracted_ar.json', JSON.stringify(extractedAr, null, 2));
console.log('Extraction complete.');
