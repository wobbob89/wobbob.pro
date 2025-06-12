const fs = require('fs');
const assert = require('assert');

const html = fs.readFileSync('home.html', 'utf8');
const matches = html.match(/class="start-stop"/g) || [];
assert(matches.length >= 2, 'Expected at least two start/stop buttons');
console.log('All tests passed');
