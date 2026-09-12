import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

let modifiedCount = 0;
let totalReplacements = 0;

walkDir('./src', (filePath) => {
  if (!/\.(jsx|js|css)$/.test(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace 1px solid, 1.5px solid, 1px dashed, 1.5px dashed
  let updated = content.replace(/(['"`])\s*(1px|1\.5px)\s+(solid|dashed)\b/g, (match, p1, p2, p3) => {
    totalReplacements++;
    return `${p1}2px ${p3}`;
  });

  // Also replace ${...} border: `1px solid ...` or `1.5px solid ...`
  updated = updated.replace(/`\s*(1px|1\.5px)\s+(solid|dashed)\b/g, (match, p1, p2) => {
    totalReplacements++;
    return `\`2px ${p2}`;
  });

  // Also catch border: '1px' or border: '1.5px' if any
  updated = updated.replace(/(border(?:Top|Bottom|Left|Right)?\s*:\s*['"`])(1px|1\.5px)\s+(solid|dashed)/g, (match, p1, p2, p3) => {
    return `${p1}2px ${p3}`;
  });

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
    modifiedCount++;
    console.log(`Updated borders in: ${filePath}`);
  }
});

console.log(`Done! Modified ${modifiedCount} files with ${totalReplacements} border replacements.`);
