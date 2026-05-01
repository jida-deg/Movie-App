const fs = require('fs');
const path = require('path');
const root = path.resolve(process.cwd(), 'src');
const allFiles = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (/\.(js|jsx|ts|tsx)$/.test(name)) allFiles.push(full);
  }
}
walk(root);
const regex = /import\s+[^;]*?from\s+['\"](.+?)['\"]/g;
const issues = [];
function caseMatch(fullPath) {
  const parts = fullPath.split(path.sep);
  let cur = parts[0] === '' ? path.sep : parts[0];
  for (let i = 1; i < parts.length; i++) {
    const entries = fs.readdirSync(cur);
    const exact = entries.find(e => e === parts[i]);
    if (!exact) return false;
    cur = path.join(cur, exact);
  }
  return true;
}
for (const file of allFiles) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = regex.exec(text))) {
    const imp = m[1];
    if (imp.startsWith('./') || imp.startsWith('../')) {
      let imported = imp;
      if (!/\.(js|jsx|css|ts|tsx)$/.test(imported)) imported += '.js';
      const candidate = path.resolve(path.dirname(file), imported);
      const exists = fs.existsSync(candidate);
      if (!exists) {
        const dir = path.dirname(candidate);
        const base = path.basename(candidate);
        const entries = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
        const close = entries.filter(e => e.toLowerCase() === base.toLowerCase());
        issues.push({file, imp, candidate, exists, close});
      } else if (!caseMatch(candidate)) {
        issues.push({file, imp, candidate, case:'mismatch'});
      }
    }
  }
}
if (issues.length === 0) console.log('OK');
else console.log(JSON.stringify(issues, null, 2));
