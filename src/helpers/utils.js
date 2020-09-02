import { store } from 'react-notifications-component';

export const removeArrayItem = (arr, value) => {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

export const showNotification = (title, message, type = "success") => {
    store.addNotification({
        title,
        message,
        type,
        insert: 'top',
        container: 'top-center',
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            showIcon: true
        }
    });
};
