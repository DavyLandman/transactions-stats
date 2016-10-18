"use strict";

const categories = require('./categories.js');

class CategoryMatcher {
    constructor(name, mainPattern, patterns) {
        this.name = name;
        this.mainPattern = mainPattern;
        this.patterns = patterns;
    }

    tryMatch(transaction) {
        let details = transaction.details;
        if (this.mainPattern.test(details)) {
            for (let [pat, cat] of this.patterns) {
                if (pat.test(details)) {
                    return cat;
                }
            }
                /*
            console.log('---- unmatched ' + this.name + ' ---');
            console.log(transaction.details);
            console.log(transaction);
            */
        }
        return categories.UNCLEAR;
    }

}

module.exports = { 
    patterns : [
        new CategoryMatcher("Pinautomaten", /^BEA\s*NR:/, [
            [/[0-9] C EST BON ALMERE/, categories.ETEN_VERS],
            [/[0-9] SLAGERIJ AHMED PAPA/, categories.ETEN_VERS],
            [/[0-9] CCV\*B\.V\.D\. SCHUUR-KOOP/, categories.ETEN_VERS], // Stoepje broodkraam
            [/[0-9] CCV\*V\.O\.F\. ROBIN EN KE/, categories.ETEN_VERS],
            [/[0-9] ALBERT HEIJN [0-9]+ [A-Z]+/, categories.SUPERMARKT],
            [/[0-9] APOTHEEK VIZIER ALMERE/, categories.APOTHEEK],
            [/[0-9] DROG.ZWANENKAMP VOF/, categories.DROGIST],

            [/BENZINESTA/, categories.TANKEN],
            [/HOSPITAALGARAGE/, categories.PARKEREN],

            [/[0-9] SPAR SCIENCEPARK AMSTERD/, categories.ETEN_WERK],

            [/[0-9] STRANDPAVILJOEN ALOH/, categories.UIT_ETEN],
            [/[0-9] CHIANG MAI /, categories.UIT_ETEN],
            [/[0-9] HEILIG BOONTJE C /, categories.UIT_ETEN],
            [/[0-9] UITSPANNING DE OASE VOGE/, categories.UIT_ETEN],

            [/[0-9] CCV\*WATERNET ZANDVOORT/, categories.UITJES],
        ]),
        new CategoryMatcher("Incasso", /^\/TRTP\/SEPA INCASSO/, [
            [/\/TLS BV INZ\. OV-CHIPKAART/, categories.OPENBAAR_VERVOER],
            [/\/NS GROEP IZ NS REIZIGERS/, categories.OPENBAAR_VERVOER],

            [/\/STICHTING BEWAARDER ACHM/, categories.HUUR_HUIS],
            [/\/XS4ALL INTERNET B\.V\./, categories.INTERNET],

            [/\/BROEKHUIS ASSURANTIE/, categories.AUTOVERZEKERING],
        ]),
        new CategoryMatcher("Overboeking", /\/TRTP\/SEPA OVERBOEKING/, [
            [/SOCIALE VERZEKERINGSBANK/, categories.BABY],
            [/M M J LANDMAN/, categories.OVERBOEKING_FAMILIE],
        ]),
        new CategoryMatcher("iDEAL", /^\/TRTP\/IDEAL/, [
            [/INZAKE ALIPAY SINGAPORE/, categories.ALIEXPRESS],
            [/HEMA BV/, categories.BABY],
            [/ESPRIT BV/, categories.KLEDING],
            [/THE STING/, categories.KLEDING],
        ])
    ]
};
