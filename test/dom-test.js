/**
 * DOM tests: run app scripts in JSDOM and assert behavior.
 * Run with: node test/dom-test.js (from repo root).
 * Used under c8 for coverage of config/ and scripts/.
 */
require('./smoke.js');

var path = require('path');
var fs = require('fs');
var root = path.resolve(__dirname, '..');

var JSDOM = require('jsdom').JSDOM;
var html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
var dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only' });
var window = dom.window;
var document = window.document;

global.window = window;
global.document = document;
global.navigator = window.navigator;
global.alert = function () {};
global.setTimeout = function () {}; /* noop so copy button stays "Copied!" for assert */
global.console = window.console;

// Mock clipboard so copy-button handler can run
global.navigator.clipboard = {
  writeText: function () { return Promise.resolve(); },
};

require(path.join(root, 'config/config.js'));
require(path.join(root, 'config/text.js'));
require(path.join(root, 'scripts/pay-methods/crypto.js'));
require(path.join(root, 'scripts/main.js'));

var errors = [];
function assert(condition, message) {
  if (!condition) errors.push(message);
}

assert(document.title === 'support us — donate', 'document.title should be set from config');
assert(document.querySelector('h1').textContent.trim().length > 0, 'header title should be filled');
assert(document.querySelector('.tagline').textContent.trim().length > 0, 'tagline should be filled');

var cards = document.querySelectorAll('.card');
assert(cards.length >= 1, 'at least one pay method card should be rendered');
var cryptoTitle = cards[0] ? cards[0].querySelector('h2') : null;
assert(cryptoTitle && cryptoTitle.textContent.trim().toLowerCase().indexOf('crypto') !== -1, 'card should be "donate with crypto"');

assert(document.querySelectorAll('.crypto-item').length > 0, 'crypto list should be populated from config');

// Exercise copy-button handler (success path)
var copyBtn = document.querySelector('.copy-btn');
assert(copyBtn, 'copy button should exist');
if (copyBtn) {
  copyBtn.click();
  // Handler uses .then(); wait for microtasks
  setImmediate(function () {
    assert(copyBtn.textContent === 'Copied!', 'copy button should show Copied! after click');
    assert(copyBtn.classList.contains('copied'), 'copy button should have .copied class');
    finish();
  });
} else {
  finish();
}

function finish() {
  if (errors.length) {
    console.error('DOM test failed:');
    errors.forEach(function (e) { console.error('  - ' + e); });
    process.exit(1);
  }
  console.log('DOM tests passed.');
}
