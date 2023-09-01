import { FileSrc } from "./file-src";

interface Ubigeo {
    deparment: string;
    province: string;
    district: string;
}

export interface Station {
    ruc: string;
    company_name: string;
    address: string;
    ubigeo:  Ubigeo;
    images: FileSrc[]
}
