import axiosInstance from './api';
import { notifyError } from '@utils/ToastNotifications';
import { CHUNK_SIZE } from '@constants/api';

const downloadChunk = async (url, artistId, start, end) => {
  try {
    return await axiosInstance.get(`${url}?artist_id=${artistId}`, {
      headers: {
        Range: `bytes=${start}-${end}`
      },
      responseType: 'blob',
    });
  } catch (error) {
    console.error(`Error downloading chunk: ${start}-${end}`, error);
    throw error;
  }
};

export const downloadFile = async (url, name, artist_id) => {
  try {
    const artistId = encodeURIComponent(artist_id);
    const downloadUrl = url.replace('uploads', 'downloads');

    const response = await axiosInstance.head(`${downloadUrl}?artist_id=${artistId}`);

    if (!response.headers['accept-ranges']) {
      throw new Error('Server does not support range requests.');
    }

    const totalSize = parseInt(response.headers['content-length'], 10);

    if (totalSize === 0) {
      throw new Error('Unable to determine the file size.');
    }

    let start = 0;
    let chunks = [];

    while (start < totalSize) {
      const end = Math.min(start + CHUNK_SIZE - 1, totalSize - 1);
      const chunkResponse = await downloadChunk(downloadUrl, artistId, start, end);

      if (chunkResponse.status !== 206 && start !== 0) {
        throw new Error('Failed to download a chunk of the file.');
      }

      chunks.push(chunkResponse.data);
      start += CHUNK_SIZE;
    }

    const blob = new Blob(chunks, { type: 'audio/mpeg' });
    const objectUrl = window.URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = objectUrl;
    downloadLink.download = `${name}.mp3`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    window.URL.revokeObjectURL(objectUrl);
  } catch (error) {
    notifyError(`Failed to download the file. ${error.message}`);
  }
};
