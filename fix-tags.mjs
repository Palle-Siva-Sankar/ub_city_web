import fs from 'fs';
import path from 'path';

function findTsxFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      results.push(...findTsxFiles(full));
    } else if (entry.name.endsWith('.tsx')) {
      results.push(full);
    }
  }
  return results;
}

const files = findTsxFiles('src');
let totalFixed = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  const fixes = []; // line indices to fix

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '</motion.div>') {
      // Walk backwards to find the matching opening tag
      let depth = 0;
      for (let j = i - 1; j >= 0; j--) {
        const t = lines[j].trim();
        
        // Count closing tags (increase depth)
        if (t === '</motion.div>' || t === '</div>') {
          depth++;
          continue;
        }
        
        // Self-closing tags don't affect depth
        if (t.endsWith('/>')) continue;
        
        // Check for opening motion.div
        if (t.startsWith('<motion.div') || t === '<motion.div>') {
          if (depth === 0) {
            // Correct match
            break;
          }
          depth--;
          continue;
        }
        
        // Check for opening div
        if ((t.startsWith('<div ') || t === '<div>') && !t.includes('</div>')) {
          if (depth === 0) {
            // MISMATCH: <div ... > paired with </motion.div>
            fixes.push(j);
            break;
          }
          depth--;
          continue;
        }
      }
    }
  }

  if (fixes.length > 0) {
    for (const lineIdx of fixes) {
      lines[lineIdx] = lines[lineIdx].replace('<div ', '<motion.div ').replace('<div>', '<motion.div>');
    }
    fs.writeFileSync(file, lines.join('\n'), 'utf8');
    totalFixed += fixes.length;
    console.log(`Fixed ${fixes.length} tag(s) in ${file}`);
    for (const f of fixes) {
      console.log(`  Line ${f + 1}: ${lines[f].trim()}`);
    }
  }
}

console.log(`\nTotal fixes: ${totalFixed}`);
