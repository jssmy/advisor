import { ModalAlert } from "src/app/commons/components/modal-alert/commons/interfaces/modal-alert";

export const ERROR_ALERT: ModalAlert = {
    title: 'Up, hubo un prblema!',
    message: 'No se pudo realizar esta acción',
    type: 'warning',
    buttons: [
        {
            id: 'button-accept',
            label: 'Aceptar',
            value: true,
            type: 'filled'
        }
    ]
};
