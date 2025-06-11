const fs = require('fs');
const assert = require('assert');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('home.html', 'utf8');
const dom = new JSDOM(html);
const startStopButtons = dom.window.document.querySelectorAll('.start-stop');
assert(startStopButtons.length >= 2, 'Expected at least two start/stop buttons');
console.log('All tests passed');
