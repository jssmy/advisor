import { ModalAlert } from "src/app/commons/components/modal-alert/commons/interfaces/modal-alert";

export const AFILIED_STATION_SUCCESS: ModalAlert = 
{
    title: 'Éxito!',
    message: 'Se afilió nueva estación',
    type: 'primary',
    buttons: [
        {
            id: 'button-success',
            label: 'Aceptar',
            value: true,
            type: 'filled'
        }
    ]
};
