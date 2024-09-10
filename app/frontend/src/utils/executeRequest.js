import { notifyError } from '@utils/ToastNotifications';

export const executeRequest = async (requestFunction) => {
    try {
        const response = await requestFunction();
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            notifyError(error?.response?.data?.message);
        } else {
            notifyError('Something went wrong :(');
        }
        throw error;
    }
};
