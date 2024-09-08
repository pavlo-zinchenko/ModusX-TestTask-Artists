import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { autoClose } from '@constants/toast';

let primaryColor = '#1976d2';
let secondaryColor = 'black';
let contrastText = '#ffffff';

export const setToastTheme = (primary, secondary, contrast) => {
    primaryColor = primary;
    secondaryColor = secondary;
    contrastText = contrast;
};

export const notifySuccess = (message) => {
    toast.success(message, {
        position: 'bottom-right',
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            backgroundColor: primaryColor,
            color: contrastText,
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
        },
    });
};

export const notifyError = (message) => {
    toast.error(message, {
        position: 'bottom-right',
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            backgroundColor: secondaryColor,
            color: contrastText,
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
        },
    });
};
