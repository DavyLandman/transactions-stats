"use strict";
const fs = require('fs'),
    cleaning = require('./cleaning.js'),
    util = require('util'),
    categories = require('./categories.js'),
    simple = require('./simple.js'),
    oneoffs = require('./oneoffs.js')
    ;

const shouldPrintUnmatched = true;
if (process.argv.length < 4) {
    console.log("Invalid arguments, call: node process.js <transactionsFile> <targetFile>");
    process.exit(0);
}
const transactionsFile = process.argv[2];
const targetFile = process.argv[3];

console.log('Parsing data');
const data = JSON.parse(fs.readFileSync(transactionsFile, 'utf8'));
cleaning.fixDates(data);

const printLeftOvers = {
    'tryMatch' : function(transaction) { 
        if (shouldPrintUnmatched) { 
            console.log('unmatched:'); 
            console.log(transaction.details);
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
let results = [];
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};

for (const trans of data.transactions) {
    let cat = categories.UNCLEAR;
    for (const rec of recognizers) {
        cat = rec.tryMatch(trans);
        if (!cat) {
            cat = categories.UNCLEAR;
        }
        if (cat != categories.UNCLEAR) {
            matched += 1;
            results = results.concat([{
                'amount' : trans.amount.amount,
                'category': cat,
                'week': trans.date.getWeek(),
                'month': trans.date.getMonth(),
                'year': trans.date.getFullYear(),
            }]);
            break;
        }
    }
}
console.log('matched: ' + matched + '/' + data.transactions.length);
if (matched == data.transactions.length) {
    console.log('Saving results');
    let target = fs.createWriteStream(targetFile, {encoding:'utf8'});
    try {
        target.write('category,week,month,year,amount\n', 'utf8');
        for (const res of results) {
            if (!target.write(res.category + ',' + res.week +','+res.month +','+res.year+',' + res.amount+'\n', 'utf8')) {
                target.drain();
            }
        }
    }
    finally {
        target.end();
    }
}

//console.log(util.inspect(data, { depth: null}));
