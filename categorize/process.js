"use strict";
const fs = require('fs'),
    cleaning = require('./cleaning.js'),
    util = require('util'),
    categories = require('./categories.js'),
    simple = require('./simple.js'),
    oneoffs = require('./oneoffs.js')
    ;

if (process.argv.length < 4) {
    console.log("Invalid arguments, call: node process.js <transactionsFile> <targetFile>");
    process.exit(0);
}
const transactionsFile = process.argv[2];
const targetFile = process.argv[3];
const shouldPrintUnmatched = false;

console.log('Parsing data');
const data = JSON.parse(fs.readFileSync(transactionsFile, 'utf8'));
cleaning.fixDates(data);

const printLeftOvers = {
    'tryMatch' : function(transaction) { 
        if (shouldPrintUnmatched) { 
            console.log('unmatched:'); 
            console.log(transaction);
        } 
        return categories.UNCLEAR;
    }
};

const recognizers = 
    simple.patterns.concat(
        oneoffs
    ).concat(
        printLeftOvers
    )
    ;
let matched = 0;

for (const trans of data.transactions) {
    let cat = categories.UNCLEAR;
    for (const rec of recognizers) {
        cat = rec.tryMatch(trans);
        if (!cat) {
            cat = categories.UNCLEAR;
        }
        if (cat != categories.UNCLEAR) {
            matched += 1;
            break;
        }
    }
}
console.log('matched: ' + matched + '/' + data.transactions.length);

//console.log(util.inspect(data, { depth: null}));
