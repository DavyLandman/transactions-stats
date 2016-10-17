"use strict";
const categories = require('./categories.js');

const patterns = [
    [/[0-9] C EST BON ALMERE/, categories.ETEN_VERS],
    [/[0-9] ALBERT HEIJN [0-9]+ [A-Z]+/, categories.SUPERMARKT],
];
module.exports = class Terminals {
    detect(transaction) {
        let details = transaction.details;
        if (/^BEA\s*NR:/.test(details)) {
            for (let [pat, cat] of patterns) {
                if (pat.test(details)) {
                    return cat;
                }
            }
        }
        return categories.UNCLEAR;
    }
};
