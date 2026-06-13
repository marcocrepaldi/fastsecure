const fs = require('fs');
const path = require('path');

const pagePath = path.join(process.cwd(), 'src', 'app', 'page.tsx');
const content = fs.readFileSync(pagePath, 'utf8');

// The file currently has the new section at the top, then '\nimport Link...'
// Let's split by 'import Link from \\'next/link\\';'
const parts = content.split("import Link from 'next/link';");
const newSection = parts[0].replace('\\n', '').trim(); // the newly generated tabs
const originalRest = "import Link from 'next/link';" + parts[1];

// Inside originalRest, we need to replace the old #produtos and #empresas
// We know they start with '<section id="produtos"' and end right before '<section className="py-5 bg-white" id="sobre">'
const startReplace = originalRest.indexOf('<section id="produtos"');
const endReplace = originalRest.indexOf('<section className="py-5 bg-white" id="sobre">');

if (startReplace !== -1 && endReplace !== -1) {
  const fixedContent = originalRest.substring(0, startReplace) + newSection + '\\n\\n      ' + originalRest.substring(endReplace);
  fs.writeFileSync(pagePath, fixedContent, 'utf8');
  console.log('Fixed page.tsx');
} else {
  console.log('Could not find replace markers');
}
