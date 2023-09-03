import { FileSrc } from "./file-src";

interface UbigeoObject {
    id: string;
    name: string;
}
interface Ubigeo {
    department: UbigeoObject;
    province: UbigeoObject;
    district: UbigeoObject;
}

export interface Station {
    id?: number;
    ruc: string;
    company_name: string;
    address: string;
    ubigeo:  Ubigeo;
    images: FileSrc[];
    created_at?: number;
}
