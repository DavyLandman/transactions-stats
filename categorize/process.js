/* jshint node: true */
"use strict";
var fs = require('fs'),
    cleaning = require('./cleaning.js'),
    util = require('util'),
    categories = require('./categories.js'),
    incasso = require('./incasso.js'),
    terminals = require('./terminals.js')
    ;

if (process.argv.length < 4) {
    console.log("Invalid arguments, call: node process.js <transactionsFile> <targetFile>");
    process.exit(0);
}
var transactionsFile = process.argv[2];
var targetFile = process.argv[3];

console.log('Parsing data');
var data = JSON.parse(fs.readFileSync(transactionsFile, 'utf8'));
cleaning.fixDates(data);

var recognizers = [
    new incasso(),
    new terminals()
];
var matched = 0;

for (let trans of data.transactions) {
    var cat = categories.UNCLEAR;
    for (let rec of recognizers) {
        cat = rec.detect(trans);
        if (!cat) {
            cat = categories.UNCLEAR;
        }
        if (cat != categories.UNCLEAR) {
            matched += 1;
            break;
        }
    }
    /*
    if (cat == categories.UNCLEAR) {
        console.log(cat);
        console.log(trans.details);
    }
    */
}
console.log('matched: ' + matched + '/' + data.transactions.length);

//console.log(util.inspect(data, { depth: null}));
