"use strict";
const categories = require('./categories.js');

const patterns = [
    [/\/TLS BV INZ\. OV-CHIPKAART/, categories.OPENBAAR_VERVOER],
    [/\/STICHTING BEWAARDER ACHM/, categories.HUUR_HUIS],
    [/\/XS4ALL INTERNET B\.V\./, categories.INTERNET],
    [/\/BROEKHUIS ASSURANTIE/, categories.AUTOVERZEKERING],
];
module.exports = class Incasso {
    detect(transaction) {
        let details = transaction.details;
        if (/^\/TRTP\/SEPA INCASSO/.test(details)) {
            for (let [pat, cat] of patterns) {
                if (pat.test(details)) {
                    return cat;
                }
            }
        }
        return categories.UNCLEAR;
    }
};
