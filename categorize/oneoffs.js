"use strict";

const categories = require('./categories.js');

const patterns = [
    [/IDEAL[\s\S]*MOEDERMELK/m, categories.BABY],

    [/^STORTING/, categories.OVERBOEKING_INTERN],
    [/[0-9] CCV\*ALMERE GSM ALMERE/, categories.MOBIEL],

    [/[0-9] STRANDPAVILJOEN TWAALF/, categories.VAKANTIE],
    [/[0-9] STRANDPAV\.PAAL/, categories.VAKANTIE],
    [/[0-9] CCV\*TEXELSE/, categories.VAKANTIE],
    [/INN DE KNIP DEN HOORN/, categories.VAKANTIE],
    [/[0-9] CAFE-RESTAURANT DE S DE/, categories.VAKANTIE],
    [/TESO-BOOTDIENST/, categories.VAKANTIE],
    [/DUINRAND TEXEL VAKANTIEHUIZEN/, categories.VAKANTIE],

    [/[0-9] RAPA NUI Z/, categories.UIT_ETEN],
    [/[0-9] WESTHOFF HAARLEM/, categories.UIT_ETEN],
    [/[0-9] [0-9]+ [A-Z]+ STARBUC/, categories.UIT_ETEN],

    [/DE KROON NIEUWEGEIN/, categories.TANKEN],
    [/ AMIGO AMERSFOORT/, categories.TANKEN],
    [/CCV\*MERCURE HOTEL AMER/, categories.PARKEREN],

    [/EIGENWIJS  S-GRAVE/, categories.HUIS],
    [/TIM EN JULIA DESIGN/, categories.KLEDING],
    [/BOOBS- N-BURPS/, categories.BABY],

    [/CCV\*HANDELSOND VAN DER Z/, categories.UNKNOWN],
    [/BLAAS EN STRANG BEHEER N/, categories.UNKNOWN],
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
