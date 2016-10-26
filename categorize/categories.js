"use strict";

class Category {
    constructor(base, name, monthly) {
        this._base = base;
        this._name = name;
        this._monthly = monthly;
    }

    get base() {
        return this._base;
    }
    get name() {
        return this._name;
    }
    get monthly() {
        return this._monthly;
    }
}

module.exports = {
    OPENBAAR_VERVOER: new Category("Vervoer", "Openbaar Vervoer", true),
    AUTOVERZEKERING: new Category("Vervoer", "Autoverzekering", true),
    TANKEN: new Category("Vervoer", "Tanken", true),
    PARKEREN: new Category("Vervoer", "Parkeren", true),
    WEGENBELASTING: new Category("Vervoer", "Wegenbelasting", true),
    WASSTRAAT: new Category("Vervoer", "Wasstraat", false),
    AUTO: new Category("Vervoer", "Auto", false),

    HUUR_HUIS: new Category("Vaste lasten", "Huur Huis", true),
    INTERNET: new Category("Vaste lasten", "XS4All Internet", true),
    ZORGVERZEKERING: new Category("Vaste lasten", "Zorgverzekering", true),
    REISVERZEKERING: new Category("Vaste lasten", "Reisverzekering", true),
    BELASTING_GEMEENTE: new Category("Vaste lasten", "Gemeentebelasting", false),
    OPVANG: new Category("Vaste lasten", "Kinderopvang", true),
    ENERGIE: new Category("Vaste lasten", "Energie", true),
    WATER: new Category("Vaste lasten", "Water", true),
    BELASTINGDIENST: new Category("Vaste lasten", "Belastingdienst", true),
    BANK: new Category("Vaste lasten", "Bank", true),
    VERZEKERING: new Category("Vaste lasten", "Verzekeringen", true),

    MOBIEL: new Category("Abonnement", "Mobiel abonnement", true),

    ETEN_VERS: new Category("Eten", "Vers eten", true),
    ETEN_WERK: new Category("Eten", "Eten op werk", true),
    SUPERMARKT: new Category("Eten", "Supermarkt", true),

    BABY: new Category("Verzorging", "Baby", true),
    DROGIST: new Category("Verzorging", "Drogist", true),
    APOTHEEK: new Category("Verzorging", "Apotheek", false),
    KAT: new Category("Verzorging", "Kat", false),
    TANDARTS: new Category("Verzorging", "Tandarts", true),

    UIT_ETEN: new Category("Ontspanning", "Uiteten", true),
    UITJES: new Category("Ontspanning", "Uitjes", true),
    SPORT: new Category("Ontspanning", "Sport", true),
    HOBBY: new Category("Ontspanning", "Hobby", false),

    VAKANTIE: new Category("Vakantie","Vakantie", false),

    KLEDING: new Category("Kleding", "Kleding", false),
    KAPPER: new Category("Kleding", "Kapper",  false),

    OVERBOEKING_INTERN: new Category("Geldbeheer", "Overboeking intern", false),
    SALARIS: new Category("Geldbeheer", "Salaris", true),


    ALIEXPRESS: new Category("Allerlei", "AliExpress", false),
    OVERBOEKING_FAMILIE: new Category("Allerlei", "Overboeking Familie", false),
    HUIS: new Category("Allerlei", "Huis", false),
    CADEAU: new Category("Allerlei", "Cadeau", false),
    WERK: new Category("Allerlei", "Werk", false),

    UNCLEAR: new Category("?", "?", false), // not yet decided
    UNKNOWN: new Category("Onbekend", "Onbekend", false) // details too vague to understand what it was
};
