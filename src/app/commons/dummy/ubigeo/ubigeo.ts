import { Deparment, District, Province } from "../../interfaces/ubigeo";

const DEPARTAMENTS: Deparment[] = require('./ubigeo_departamentos.json');
const PROVINCES: Province[] = require('./ubigeo_provincias.json');
const DISTRICT: District[] = require('./ubigeo_distritos.json');

export const UBIGEO = Object.freeze(
    {
        DEPARTAMENTS,
        PROVINCES,
        DISTRICT
    }
);