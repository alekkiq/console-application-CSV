"use strict";

const path = require("path");
const { lueSyote, tulosta } = require("./syote/syotekirjasto");
const { aktiivinen } = require("./config.json");
const Tietovarasto = require(path.join(__dirname, aktiivinen, 'tietovarastokerros'));


const valikko = `
Valitse:

1. hae kaikki koirat
2. hae koira
3. lisää koira
4. muuta koiran tietoja
5. poista koira
6. lopeta

Anna valintasi (1,2,3,4,5 tai 6): `;

const endMes = `
#############################
            Kiitos!
#############################`;

const errMes = `
#############################
 Anna numero 1,2,3,4,5 tai 6
#############################`;


const varasto = new Tietovarasto();

async function lueValinta() {
    return await lueSyote(valikko);
}

function tulostaVirhe() {
    tulosta(errMes);
}

function tulostaLopputeksti() {
    tulosta(endMes);
}

function muodostaStatus(viesti) {
    return `\nTulos\n${viesti}`;
}

function rivi(koira) {
    return `Numero ${koira.numero}: 
    Rotu: ${koira.rotu}
    Pituus: ${koira.pituus}
    Tyyppi: ${koira.tyyppi}
    paino (kg): ${koira.painoKg}
    
    `;
}

async function haekaikkiKoirat() {
    tulosta("\nKaikki koirat\n");
    for (const num of await varasto.haekaikki2()) {
        tulosta(rivi(num));
    }
}
async function haeYksiKoira() {
    try {
        const numero = +await lueSyote("Anna numero: ");
        const tulos = await varasto.hae(numero);
        tulosta("\nHae koira\n");
        tulosta(rivi(tulos));
    }
    catch (virhe) {
        tulosta(muodostaStatus(virhe.viesti))
    }
}

async function lueKoira() {
    const numero = +await lueSyote("Anna numero: ");
    const rotu = await lueSyote("Rotu: ");
    const pituus = await lueSyote("Pituus: ");
    const tyyppi = await lueSyote("Tyyppi: ");
    const painoKg = +await lueSyote("PainoKg: ");
    return {
        numero, rotu, pituus, tyyppi, painoKg
    };
}

async function paivitaKoira() {
    try {
        const muutos = await lueKoira();
        const tulos = await varasto.paivita(muutos);
        tulosta(muodostaStatus(tulos.viesti));
    }
    catch (virhe) {
        tulosta(muodostaStatus(virhe.viesti));
    }
}
async function lisaaKoira() {
    try {
        const uusi = await lueKoira();
        const stat = await varasto.lisaaUusi(uusi);
        tulosta(muodostaStatus(stat.viesti));
    }
    catch (virhe) {
        tulosta(muodostaStatus(virhe.viesti));
    }
}
async function poistaKoira() {
    try {
        const numero = +await lueSyote("Anna numero: ");
        const stat = await varasto.poista(numero);
        tulosta(muodostaStatus(stat.viesti));
    }
    catch (virhe) {
        tulosta(muodostaStatus(virhe.viesti));
    }
}
module.exports = { haekaikkiKoirat, haeYksiKoira, lisaaKoira, poistaKoira, paivitaKoira, muodostaStatus, lueKoira, lueValinta, tulostaVirhe, tulostaLopputeksti };