"use strict";

const categories = require('./categories.js');

const patterns = [

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
    [/IDEAL[\s\S]*MOEDERMELK/m, categories.BABY],
    [/BOOBS- N-BURPS/, categories.BABY],
    [/VERZAMELAARSMARKT/, categories.BABY],
    [/MAMABAND/, categories.KLEDING],
    [/MAMALOES \& KIDS/, categories.KLEDING],
    [/TASK RETAIL BV/, categories.KLEDING],
    [/BUCKAROO.*SHOPNL00104737/,categories.KLEDING],
    [/08 STADHUISPLEIN [0-9]+ ALMERE/, categories.KLEDING],
    [/ELKA PHOTO FINISHING/, categories.BABY], // baby kaartje
    [/BABYCARE KRAAMZORG/, categories.BABY],

    [/INZ\. OV-CHIPKAART/, categories.OPENBAAR_VERVOER],
    [/BROEKHUIS HARDERWIJK[\s\S]*9731/, categories.AUTO],
    [/INDEPENDER.NL SERVICESBV[\s\S]*COOL EDITION/, categories.AUTOVERZEKERING],
    [/ANWB CONTRIBUTIE/, categories.AUTOVERZEKERING],
    [/ABN AMRO BANK .* BETAALGEMAK/, categories.BANK],
    [/PAKKETVERZ\. POLISNR\. [ 0-9]+MAANDPREMIE/, categories.VERZEKERING],

    [/CCV\*HANDELSOND VAN DER Z/, categories.UNKNOWN],
    [/BLAAS EN STRANG BEHEER N/, categories.UNKNOWN],
];

module.exports = {
    'tryMatch': function(transaction) {
        let details = transaction.details.replace(/(?:\r\n|\r|\n)/g,'');

        for (let [pat, cat] of patterns) {
            if (pat.test(details)) {
                return cat;
            }
        }
        return categories.UNCLEAR;
    }
};
