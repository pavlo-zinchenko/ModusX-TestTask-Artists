import axiosInstance from './api';
import { notifyError } from '@utils/ToastNotifications';

export const downloadFile = async (url, name, artist_id) => {
    try {
        const artistId = encodeURIComponent(artist_id);
        const downloadUrl = url.replace('uploads', 'downloads');

        const response = await axiosInstance.get(`${downloadUrl}?artist_id=${artistId}`, {
            responseType: 'blob',
        });

        if (response.status !== 200) {
            throw new Error(`Failed to download the file. Status code: ${response.status}`);
        }

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const objectUrl = window.URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = objectUrl;
        downloadLink.download = `${name}.mp3`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();

        window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
        notifyError(`Failed to download the file. ${error.response.statusText}`);
    }
};
