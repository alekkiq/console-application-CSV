"use strict";

const lue = require("./syote/syotekirjasto");

const {
    haekaikkiKoirat,
    haeYksiKoira,
    lisaaKoira,
    poistaKoira,
    paivitaKoira,
    lueValinta,
    tulostaVirhe,
    tulostaLopputeksti }
    = require("./funktiot");
valitse();
async function valitse() {
    let loppu = false;
    do {
        const valinnat = await lueValinta();
        switch (valinnat) {
            case "1":
                await haekaikkiKoirat();
                break;
            case "2":
                await haeYksiKoira();
                break;
            case "3":
                await lisaaKoira();
                break;
            case "4":
                await paivitaKoira();
                break;
            case "5":
                await poistaKoira();
                break;
            case "6":
                tulostaLopputeksti();
                loppu = true;
                break;
            default:
                tulostaVirhe();
        }
    } while (!loppu);
}
