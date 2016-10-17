"use strict";
const categories = require('./categories.js');

const patterns = [
    [/[0-9] C EST BON ALMERE/, categories.ETEN_VERS],
    [/[0-9] SLAGERIJ AHMED PAPA/, categories.ETEN_VERS],
    [/[0-9] CCV\*V\.O\.F\. ROBIN EN KE/, categories.ETEN_VERS],
    [/[0-9] ALBERT HEIJN [0-9]+ [A-Z]+/, categories.SUPERMARKT],

    [/BENZINESTA/, categories.TANKEN],
    [/HOSPITAALGARAGE/, categories.PARKEREN],

    [/[0-9] SPAR SCIENCEPARK AMSTERD/, categories.ETEN_WERK],

    [/[0-9] STRANDPAVILJOEN ALOH/, categories.UIT_ETEN],
    [/[0-9] CHIANG MAI /, categories.UIT_ETEN],
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
            console.log('--- not matching terminal ---');
            console.log(details);
            console.log(transaction);
        }
        return categories.UNCLEAR;
    }
};
