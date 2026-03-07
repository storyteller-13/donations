/**
 * Smoke tests: required files exist and index.html structure is valid.
 * Run with: node test/smoke.js (from repo root)
 */
var fs = require('fs');
var path = require('path');

var root = path.resolve(__dirname, '..');
var errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

// Required files exist
var requiredFiles = [
  'index.html',
  'config/config.js',
  'config/text.js',
  'scripts/main.js',
  'scripts/pay-methods/crypto.js',
  'styles/main.css',
  'assets/favicon.svg',
];
requiredFiles.forEach(function (file) {
  var full = path.join(root, file);
  assert(fs.existsSync(full), 'Missing file: ' + file);
});

// index.html references config and pay-method scripts
var html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert(html.indexOf('config/config.js') !== -1, 'index.html should load config/config.js');
assert(html.indexOf('config/text.js') !== -1, 'index.html should load config/text.js');
assert(html.indexOf('scripts/pay-methods/crypto.js') !== -1, 'index.html should load scripts/pay-methods/crypto.js');
assert(html.indexOf('scripts/main.js') !== -1, 'index.html should load scripts/main.js');
assert(html.indexOf('styles/main.css') !== -1, 'index.html should load styles/main.css');
assert(html.indexOf('id="pay-methods"') !== -1, 'index.html should have #pay-methods container');
assert(html.indexOf('data-text=') !== -1, 'index.html should use data-text for config-driven copy');

// config/text.js defines APP_TEXT
var textSrc = fs.readFileSync(path.join(root, 'config/text.js'), 'utf8');
assert(textSrc.indexOf('window.APP_TEXT') !== -1, 'config/text.js should define window.APP_TEXT');
assert(textSrc.indexOf('pageTitle') !== -1, 'config/text.js should define pageTitle');
assert(textSrc.indexOf('crypto') !== -1, 'config/text.js should define crypto copy');

// config/config.js defines APP_CONFIG
var configSrc = fs.readFileSync(path.join(root, 'config/config.js'), 'utf8');
assert(configSrc.indexOf('window.APP_CONFIG') !== -1, 'config/config.js should define window.APP_CONFIG');
assert(configSrc.indexOf('crypto') !== -1, 'config/config.js should define crypto config');

if (errors.length) {
  console.error('Smoke test failed:');
  errors.forEach(function (e) { console.error('  - ' + e); });
  process.exit(1);
}
console.log('Smoke tests passed.');
