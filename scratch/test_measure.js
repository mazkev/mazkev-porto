const { execSync } = require('child_process');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

// We can run msedge with a test html that prints heights or dump DOM
const html = fs.readFileSync('scratch/resume_fullstack_id.html', 'utf8');
// Let's see the sections on page 1
console.log('Inspecting sections...');
