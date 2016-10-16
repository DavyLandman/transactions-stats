/* jshint node: true */
"use strict";
var fs = require('fs'),
    cleaning = require('./cleaning.js'),
    util = require('util'),
    categories = require('./categories.js'),
    incasso = require('./incasso.js')
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

var recognizers = [incasso];

for (var t in data.transactions) {
    var trans = data.transactions[t];
    var cat = categories.UNCLEAR;
    for (var r in recognizers) {
        cat = recognizers[r].detect(trans);
        if (!cat) {
            cat = categories.UNCLEAR;
        }
        if (cat != categories.UNCLEAR) {
            break;
        }
    }
    if (cat != categories.UNCLEAR) {
        console.log(cat);
        console.log(trans.details);
    }
}

//console.log(util.inspect(data, { depth: null}));
