import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export function showDefaultNotificaion(props) {
    return notifications.show({
        title: props.title,
        message: props.message,
        autoClose: props.autoClose || 1500,
    })
}

export function showErrorNotification(props) {
    return notifications.show({
        title: 'Error',
        color: 'red',
        message: props.message,
        autoClose: props.autoClose || 1500,
    })
}

export function showSuccessNotification(props) {
    return notifications.show({
        title: 'Éxito',
        color: 'teal',
        message: props.message,
        autoClose: props.autoClose || 1500,
    })
}

export function showLoadingNotification(props) {
    const id = notifications.show({
        title: 'Creando registro',
        loading: true,
        message: props.message,
        autoClose: false,
    })
    return id;
}

export function updateSuccessLoadingNotification(idNotificacion, title, message) {
    return notifications.update({
        id: idNotificacion,
        color: 'teal',
        title: title || 'Éxito',
        message: message || 'El registro ha sido creado con éxito',
        icon: <IconCheck style={{ width: 20, height: 20 }} />,
        loading: false,
        autoClose: 1500,
    });

}
export function updateErrorLoadingNotification(idNotificacion, title, message) {
    return notifications.update({
        id: idNotificacion,
        color: 'red',
        title: title || 'Error',
        message: message || 'El registro no ha podido crearse',
        icon: <IconX style={{ width: 20, height: 20 }} />,
        loading: false,
        autoClose: 1500,
    });

}