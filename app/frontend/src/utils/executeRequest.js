import { notifySuccess, notifyError } from '../utils/ToastNotifications';

export const executeRequest = async (requestFunction, successMessage) => {
    try {
        const response = await requestFunction();
        if (successMessage) {
            notifySuccess(successMessage);
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            notifyError(error.response.data.message);
        } else {
            notifyError('Something went wrong, please try again.');
        }
        throw error;
    }
};
