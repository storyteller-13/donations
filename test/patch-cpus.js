/**
 * Ensure os.cpus().length >= 1 so nyc (p-map) does not get concurrency 0.
 * Use: node -r test/patch-cpus.js node_modules/.bin/nyc node test/dom-test.js
 */
var os = require('os');
var orig = os.cpus;
os.cpus = function () {
  var c = orig.call(os);
  return c.length ? c : [{}];
};
