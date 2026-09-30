const fs = require('fs');

// Let's inspect the lines and structure of scratch/resume_fullstack_id.html
const html = fs.readFileSync('scratch/resume_fullstack_id.html', 'utf8');
const pages = html.split('<div class="page-break"></div>');
console.log('Number of pages in HTML:', pages.length);
pages.forEach((p, i) => {
  console.log(`Page ${i+1} characters:`, p.length);
});
