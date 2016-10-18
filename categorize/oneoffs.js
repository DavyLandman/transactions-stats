"use strict";

const categories = require('./categories.js');

const patterns = [
    [/IDEAL[\s\S]*MOEDERMELK/m, categories.BABY],
    [/^STORTING/, categories.OVERBOEKING_INTERN],

];

module.exports = {
    'tryMatch': function(transaction) {
        let details = transaction.details;
        for (let [pat, cat] of patterns) {
            if (pat.test(details)) {
                return cat;
            }
        }
        return categories.UNCLEAR;
    }
};
