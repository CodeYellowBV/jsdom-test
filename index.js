var path = require('path');
var jsdom = require('jsdom');
var fs = require('fs');

var args = process.argv.slice(2);
var messages = [];

if (args.length !== 1) {
    throw new Error('This script only accepts one argument; a filepath.');
}

// Try to load the file.
var file = fs.readFileSync(args[0], 'utf8');
var documentRoot = path.resolve(path.dirname(args[0]));

// Pass all console.log to node.js
var virtualConsole = jsdom.createVirtualConsole().sendTo(console);

virtualConsole.on('jsdomError', function (err) {
    console.log('JSDom Error: ', err);
});

var exec = jsdom.jsdom(file, {
    // URLs in the file will be relative to this.
    url: 'file://' + documentRoot + '/',
    virtualConsole: virtualConsole,
});

// This represents the window object of the loaded html.
var window = exec.defaultView;

window.onMochaTestFinish = function (failedCount) {
    if (failedCount > 0) {
        console.log(failedCount + ' failing tests.');
        process.exit(1);
    }
    console.log('Tests succeeded.');
};
