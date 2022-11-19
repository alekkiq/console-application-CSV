"use strict";
const fs = require("fs");
const readline = require("readline");

async function lue(varastoTiedosto) {
    const lukija = readline.createInterface({
        input: fs.createReadStream(varastoTiedosto)
    });
    const rivit = [];
    try {
        for await (const rivi of lukija) {
            rivit.push(rivi);
        }
        const tieto = [];
        for (let rivi of rivit) {
            tieto.push(rivi.split('","').map(i => i.replace(/["]/g, "")));
        }
        return csvToJson(tieto);
    }
    catch (virhe) {
        return [];
    }
}
async function kirjoita(varastoTiedosto, data) {
    try {
        await fs.promises.writeFile(varastoTiedosto, luoCsv(data), {
            encoding: "utf-8",
            flag: "w"
        });
        return true;
    }
    catch (virhe) {
        return false;
    }
}
module.exports = { lue, kirjoita };

function csvToJson(data) {
    const [otsikot, ...tiedot] = data;
    const jsonData = [];
    for (let alkio of tiedot) {
        if (alkio.length === otsikot.length) {
            const olio = {};
            for (let i = 0; i < otsikot.length; i++) {
                olio[otsikot[i]] = alkio[i];
            }
            jsonData.push(olio);
        }
    }
    return jsonData;
}

function luoCsv(data) {
    let csvmerkkijono = "";
    if (data.length > 0) {
        csvmerkkijono = '"' + Object.keys(data[0]).join('","') + '"\n';
        for (let alkio of data) {
            csvmerkkijono += '"' + Object.values(alkio).join('","') + '"\n';
        }
    }
    return csvmerkkijono;
}