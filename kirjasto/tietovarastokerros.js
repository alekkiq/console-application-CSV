"use strict";

const { lisaa, poista, paivita, haeYksi, haeKaikki } = require("./kirjastoapufunktiot");
const { STATUSVIESTIT, STATUSKOODIT } = require("./sKoodit");


module.exports = class Tietovarasto {
    get STATUSKOODIT() {
        return STATUSKOODIT;
    };
    hae(numero) {
        return new Promise(async (resolve, reject) => {
            if (!numero) {
                reject(STATUSVIESTIT.EI_LOYTYNYT("_"));
            }
            else {
                const tulos = await haeYksi(numero);
                if (tulos) {
                    resolve(tulos);
                }
                else {
                    reject(STATUSVIESTIT.EI_LOYTYNYT(numero));
                }
            }
        });
    }

    haekaikki2() {
        return haeKaikki();
    }

    poista(numero) {
        return new Promise(async (resolve, reject) => {
            if (!numero) {
                reject(STATUSVIESTIT.EI_LOYTYNYT("_"))
            }
            else if (await poista(numero)) {
                resolve(STATUSVIESTIT.POISTO_OK(numero));
            }
            else {
                reject(STATUSVIESTIT.EI_POISTETTU());
            }
        });
    }

    paivita(muutos) {
        return new Promise(async (resolve, reject) => {
            if (muutos) {
                if (await paivita(muutos)) {
                    resolve(STATUSVIESTIT.PAIVITYS_OK(muutos.numero));
                }
                else {
                    reject(STATUSVIESTIT.EI_PAIVITETTY());
                }
            }
            else {
                reject(STATUSVIESTIT.EI_PAIVITETTY());
            }
        });
    }

    lisaaUusi(uusi) {
        return new Promise(async (resolve, reject) => {
            if (uusi) {
                if (!uusi.numero) {
                    reject(STATUSVIESTIT.EI_LISATTY());
                }
                else if (await haeYksi(uusi.numero)) {
                    reject(STATUSVIESTIT.JO_KAYTOSSA(uusi.numero));
                }
                else if (await lisaa(uusi)) {
                    resolve(STATUSVIESTIT.LISAYS_OK(uusi.numero));
                }
                else {
                    reject(STATUSVIESTIT.EI_LISATTY());
                }
            }
            else {
                reject(STATUSVIESTIT.EI_LISATTY());
            }
        });
    }
}