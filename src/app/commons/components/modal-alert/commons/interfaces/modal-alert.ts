export interface ModalOption {
    label: string;
    value: any,
    id: string;
    type: 'outlined' | 'filled',
}

export interface ModalAlert {
    type: 'success' | 'info' | 'danger' | 'warning' | 'primary';
    title: string;
    message: string;
    buttons: ModalOption[]
}
