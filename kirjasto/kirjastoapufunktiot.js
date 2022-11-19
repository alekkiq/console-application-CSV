"use strict";

const path = require("path");
const { csvtiedosto } = require("./koiraconfig.json");
const varastoFile = path.join(__dirname, csvtiedosto); // Change "csvtiedosto" to "jsontiedosto" in order to make it work with a JSON file
const { lue, kirjoita } = require("./kasittelija");



async function haeKaikki() {
    return lue(varastoFile);
}

async function lisaa(uusi) {
    const stor = await lue(varastoFile);
    stor.push(uusi);
    return await kirjoita(varastoFile, stor);
}

async function poista(numero) {
    const stor = await lue(varastoFile);
    const i = stor.findIndex(x => x.numero == numero);
    if (i < 0) return false;
    stor.splice(i, 1);
    return await kirjoita(varastoFile, stor);
}

async function paivita(ob) {
    const stor = await lue(varastoFile);
    const vanha = stor.find(old => old.numero == ob.numero);
    if (vanha) {
        Object.assign(vanha, ob);
        return await kirjoita(varastoFile, stor);
    }
    return false;
}

async function haeYksi(numero) {
    return (await lue(varastoFile)).find(ob => ob.numero == numero);
}


module.exports = { lisaa, poista, paivita, haeYksi, haeKaikki };