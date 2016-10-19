"use strict";

const categories = require('./categories.js');
const oneoffs = require('./oneoffs.js');

class CategoryMatcher {
    constructor(name, mainPattern, patterns,printMismatch) {
        this.name = name;
        this.mainPattern = mainPattern;
        this.patterns = patterns;
        this.printMismatch = printMismatch;
    }

    tryMatch(transaction) {
        let details = transaction.details;
        if (this.mainPattern.test(details)) {
            for (let [pat, cat] of this.patterns) {
                if (pat.test(details)) {
                    return cat;
                }
            }
            if (this.printMismatch && oneoffs.tryMatch(transaction) == categories.UNCLEAR) {
                console.log('---- unmatched ' + this.name + ' ---');
                console.log(transaction.details);
                console.log(transaction);
            }
        }
        return categories.UNCLEAR;
    }

}

module.exports = { 
    patterns : [
        new CategoryMatcher("Pinautomaten", /^BEA\s*NR:/, [
            [/[0-9] C EST BON ALMERE/, categories.ETEN_VERS],
            [/[0-9] DE ENKHUIZER NOTENK/, categories.ETEN_VERS],
            [/[0-9] SLAGERIJ AHMED PAPA/, categories.ETEN_VERS],
            [/[0-9] MINI.*SUPERMARKT.*POORT/, categories.ETEN_VERS], // oude naam Ahmed
            [/[0-9] CCV\*B\.V\.D\. SCHUUR-KOOP/, categories.ETEN_VERS], // Stoepje broodkraam
            [/[0-9] CCV\*SMULLENDE STEVEN/, categories.ETEN_VERS], // andere broodkraam
            [/[0-9] CCV\*V\.O\.F\. ROBIN EN KE/, categories.ETEN_VERS],
            [/[0-9] KAASHANDEL/, categories.ETEN_VERS],
            [/[0-9] CCV\*POELIERSBEDRIJF/, categories.ETEN_VERS],
            [/[0-9] DE KAAZZAAK/, categories.ETEN_VERS],
            [/[0-9] DE ENHUIZER WORSTEN/, categories.ETEN_VERS],

            [/[0-9] ALBERT HEIJN [0-9]+ [A-Z]+/, categories.SUPERMARKT],
            [/[0-9] DEEN [A-Z]+[0-9]+ [A-Z]+/, categories.SUPERMARKT],
            [/[0-9] JUMBO [A-Z ]+/, categories.SUPERMARKT],
            [/[0-9] ALDI [0-9]+ [A-Z ]+/, categories.SUPERMARKT],
            [/[0-9] [0-9]+ LIDL [A-Z ]+/, categories.SUPERMARKT],
            [/[0-9] GEMBIRA ALMERE/, categories.SUPERMARKT], // TOKO in centrum

            [/[0-9] APOTHEEK VIZIER ALMERE/, categories.APOTHEEK],

            [/[0-9] DROG.ZWANENKAMP VOF/, categories.DROGIST],
            [/[0-9] DROGISTERIJ/, categories.DROGIST],
            [/[0-9] KRUIDVAT [0-9]+ [A-Z]+/, categories.DROGIST],
            [/[0-9] ETOS [0-9]+ [A-Z]+/, categories.DROGIST],

            [/[0-9][ A-Z]* HEMA [A-Z]+[ 0-9]*/, categories.BABY],
            [/[0-9] TOYSXL\. FIL\./, categories.BABY],
            [/[0-9] SEPAY\-BABY\&BORST BV/, categories.BABY],
            [/[0-9] FLEVOZIEKENHUIS /, categories.BABY],

            [/[0-9] EAZY HAIR/, categories.KAPPER],
            [/[0-9] STEPS NEDERLAND/, categories.KLEDING],
            [/[0-9] RAP\* BEELINE RETAIL/, categories.KLEDING],
            [/[0-9] MANFIELD /, categories.KLEDING],
            [/[0-9] VM [A-Z]+/, categories.KLEDING], // Vero Moda
            [/[0-9] H\&M [0-9]+/, categories.KLEDING],
            [/[0-9] HUNKEMOLLER [0-9]+/, categories.KLEDING],
            [/[0-9] SACHA FIL-[0-9]+/, categories.KLEDING],

            [/BENZINESTA/, categories.TANKEN],
            [/TANKSTA/, categories.TANKEN],
            [/ BENZINE /, categories.TANKEN],
            [/ FIREZONE /, categories.TANKEN],
            [/ SB TANK /, categories.TANKEN],
            [/ AVIA /, categories.TANKEN],
            [/ SHELL /, categories.TANKEN],
            [/ BP EXPRESS /, categories.TANKEN],
            [/ TAMOIL /, categories.TANKEN],
            [/ AUTORADAM /, categories.TANKEN],

            [/HOSPITAALGARAGE/, categories.PARKEREN],
            [/SCHIPPERGARAGE AL/, categories.PARKEREN],
            [/ PARKING/, categories.PARKEREN],
            [/ P6 UITGAANSCENTRUM /, categories.PARKEREN],
            [/ UMC UTRECHT UTRECHT/, categories.PARKEREN],
            [/ MERCURE HOTEL AMER/, categories.PARKEREN],

            [/WASSTRAAT/, categories.WASSTRAAT],

            [/[0-9] NS\-[A-Z ]+ [0-9]+ [A-Z]+/, categories.OPENBAAR_VERVOER],

            [/[0-9] SPAR SCIENCEPARK AMSTERD/, categories.ETEN_WERK],
            [/[0-9] 2536 STICHTING CWI.*,PAS[0-9]+/, categories.ETEN_WERK],
            [/[0-9] ANTONI VAN LEEUWENHK/, categories.ETEN_WERK],

            [/[0-9] STRANDPAVILJOEN ALOH/, categories.UIT_ETEN],
            [/[0-9] CHIANG MAI /, categories.UIT_ETEN],
            [/[0-9] CM THAI FOOD 2 GO /, categories.UIT_ETEN],
            [/[0-9] HEILIG BOONTJE C /, categories.UIT_ETEN],
            [/[0-9] UITSPANNING DE OASE VOGE/, categories.UIT_ETEN],
            [/[0-9] BOBBIE BEER/, categories.UIT_ETEN],
            [/[0-9] CCV\*NELIS IJSSALON/, categories.UIT_ETEN],
            [/[0-9][A-Z ]* STARBUCKS /, categories.UIT_ETEN],
            [/[0-9] BRAM LADAGE/, categories.UIT_ETEN],
            [/[0-9] CCV\*POLDER HORECA/, categories.UIT_ETEN],
            [/[0-9] CCV\*IJSPRESSI/, categories.UIT_ETEN],
            [/[0-9] TANTE TRUUS /, categories.UIT_ETEN],
            [/[0-9] PARNASSIA AAN ZEE/, categories.UIT_ETEN],
            [/[0-9] GRANDFETARIA/, categories.UIT_ETEN],
            [/LUNCHTIJD /, categories.UIT_ETEN],
            [/BAKKER BORSCH /, categories.UIT_ETEN],
            [/DE VELDKEUKEN /, categories.UIT_ETEN],

            [/[0-9] CCV\*WATERNET ZANDVOORT/, categories.UITJES],

            [/[0-9] JUMPER ALMERE/, categories.KAT],
            [/[0-9] DIERENZIEKENHUIS/, categories.KAT],


            [/[0-9] IKEA [A-Z]+/, categories.HUIS],
            [/[0-9] LOODS 5 [A-Z]+/, categories.HUIS],
            [/[0-9] BLOKKER [0-9 ]*[A-Z]+/, categories.HUIS],
            [/[0-9] GAMMA [A-Z]+/, categories.HUIS],
            [/DAILY STYLE, ALMERE/, categories.HUIS],

            [/RIAS STYLE/, categories.HOBBY],
            [/ BRUNA[ .][A-Z]+/, categories.HOBBY],
            [/ JENNY S TABAKSWINKEL /, categories.HOBBY],
            [/ BEVER /, categories.HOBBY],

            [/ STUMPEL /, categories.CADEAU],
            [/ BLOEMEN /, categories.CADEAU],
            [/JENIFFERSBLOEMEN/, categories.CADEAU],

            [/[0-9] SPORTEXPL/, categories.SPORT],
            [/[0-9] UNIVERSUM AMSTERDAM/, categories.SPORT],
            [/[0-9] PINDIRECT [A-Z]+[0-9]+/, categories.UNKNOWN],
        ], true),
        new CategoryMatcher("Incasso", /^\/TRTP\/SEPA INCASSO/, [
            [/\/TLS BV INZ\. OV-CHIPKAART/, categories.OPENBAAR_VERVOER],
            [/\/NS GROEP IZ NS REIZIGERS/, categories.OPENBAAR_VERVOER],

            [/\/STICHTING BEWAARDER ACHM/, categories.HUUR_HUIS],
            [/\/XS4ALL INTERNET B\.V\./, categories.INTERNET],
            [/\/YOUFONE NEDERLAND BV/, categories.MOBIEL],
            [/\/GEMEENTE ALMERE/, categories.BELASTING_GEMEENTE],
            [/\/NUON KLANTENSERVICE/, categories.ENERGIE],
            [/\/GBLT INCASSO/, categories.WATER],
            [/\/VITENS/, categories.WATER],

            [/\/BROEKHUIS ASSURANTIE/, categories.AUTOVERZEKERING],
            [/\/KIEMER/, categories.ZORGVERZEKERING],
            [/\/ANWB VERZEKEREN/, categories.REISVERZEKERING],

            [/\/BELASTINGDIENST[\s\S]*[0-9]+-[A-Z]+-[0-9]+/, categories.WEGENBELASTING],

            [/\/CHILD CARE KINDEROPVANG BV/, categories.OPVANG],

            [/\/MARIT VAN OOSTVEEN MOM I/, categories.SPORT],
        ], true),
        new CategoryMatcher("Overboeking", /\/TRTP\/SEPA OVERBOEKING/, [
            [/SOCIALE VERZEKERINGSBANK/, categories.BABY],
            [/M M J LANDMAN/, categories.OVERBOEKING_FAMILIE],
            [/ZAKGELD/, categories.OVERBOEKING_INTERN],
            [/REMI\/SPAREN/, categories.OVERBOEKING_INTERN],
            [/[0-9]+9364\/[\s\S]*DAVY LANDMAN/, categories.OVERBOEKING_INTERN],
            [/ST CENTR WISK INFORM[\s\S]*SALARIS/, categories.SALARIS],
            [/NED VER VOOR ONCOLOGIE/, categories.WERK],
            [/ANTONI VAN LEEUWENHOEK ZIEKENHUIS[\s\S]*SALARIS/, categories.SALARIS],
            [/ESPRIT RETAIL B\.V\./, categories.KLEDING],
            [/BOL.COM/, categories.SUPERMARKT],
            [/CHILD CARE KINDEROPVANG/, categories.OPVANG],
            [/APOTHEEK /, categories.APOTHEEK],
        ], true),
        new CategoryMatcher("iDEAL", /^\/TRTP\/IDEAL/, [
            [/INZAKE ALIPAY SINGAPORE/, categories.ALIEXPRESS],
            [/HEMA BV/, categories.BABY],
            [/BABY EN BORST BV/, categories.BABY],
            [/INTERTOYS/, categories.BABY],
            [/ESPRIT RET/, categories.KLEDING],
            [/THE STING/, categories.KLEDING],
            [/BOL\.COM/, categories.SUPERMARKT],
            [/DE GROENE VROUW/, categories.HOBBY],
            [/WEBPRINT/, categories.HUIS],
        ], true)
    ]
};
