const fs = require('fs');
const path = require('path');

const projectsFile = fs.readFileSync(path.join(__dirname, '../app/lib/data/projects.ts'), 'utf8');
const lines = projectsFile.split('\n');

const projectImages = [];
let currentTitle = '';

for (const line of lines) {
  const titleMatch = line.match(/title:\s*['"]([^'"]+)['"]/);
  if (titleMatch) {
    currentTitle = titleMatch[1];
  }
  const imgMatch = line.match(/image:\s*['"]([^'"]+)['"]/);
  if (imgMatch) {
    projectImages.push({ title: currentTitle, img: imgMatch[1] });
  }
}

console.log('Total project image references:', projectImages.length);

const missing = [];
const existing = [];

for (const p of projectImages) {
  const localPath = path.join(__dirname, '../public', p.img.replace(/^\//, ''));
  if (!fs.existsSync(localPath)) {
    missing.push(p);
  } else {
    existing.push(p);
  }
}

console.log('Missing images count:', missing.length);
console.log('Missing details:', JSON.stringify(missing, null, 2));
