import { FileSrc } from "./file-src";

interface UbigeoObject {
    id: string;
    name: string;
}
interface Ubigeo {
    deparment: UbigeoObject;
    province: UbigeoObject;
    district: UbigeoObject;
}

export interface Station {
    ruc: string;
    company_name: string;
    address: string;
    ubigeo:  Ubigeo;
    images: FileSrc[]
}
