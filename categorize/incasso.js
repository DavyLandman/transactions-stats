/* jshint node: true */
"use strict";
var categories = require('./categories.js');

var patterns = [
    [/\/TLS BV INZ\. OV-CHIPKAART/, categories.OPENBAAR_VERVOER],
    [/\/STICHTING BEWAARDER ACHM/, categories.HUUR_HUIS],
    [/\/XS4ALL INTERNET B\.V\./, categories.INTERNET],
    [/\/BROEKHUIS ASSURANTIE/, categories.AUTOVERZEKERING],
];
module.exports = {
    detect : function(transaction) {
        var details = transaction.details;
        if (/^\/TRTP\/SEPA INCASSO/.test(details)) {
            for (var i in patterns) {
                if (patterns[i][0].test(details)) {
                    return patterns[i][1];
                }
            }
        }
        return categories.UNCLEAR;
    }
};
