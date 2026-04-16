const fs = require('fs');
const path = require('path');

const directory = './src';
const replacements = [
    [/UB City/g, 'Mall of America'],
    [/Bengaluru/g, 'Bloomington, MN'],
    [/Bangalore/g, 'Bloomington, MN']
];

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (/\.(tsx|ts|html)$/.test(file)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            replacements.forEach(([regex, replacement]) => {
                if (regex.test(content)) {
                    content = content.replace(regex, replacement);
                    changed = true;
                }
            });
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
}

walk(directory);
console.log('Rebrand complete.');
