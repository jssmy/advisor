import { ModalAlert } from "src/app/commons/components/modal-alert/commons/interfaces/modal-alert";

export const CONFIRM_ACTION: ModalAlert = {
    title: 'Confirmar',
    message: 'Estás seguro realizar esta acción?',
    type: 'primary',
    buttons: [
        {
            id: 'button-close-alert',
            label: 'Cancelar',
            value: false,
            'type': 'outlined'
        },
        {
            id: 'button-confir-alert',
            label: 'Aceptar',
            value: true,
            type: 'filled'
        }
    ]
};
