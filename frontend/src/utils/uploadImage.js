import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        // Must NOT be set manually — axios auto-sets:
        //   Content-Type: multipart/form-data; boundary=<generated>
        // Setting it manually omits the boundary and breaks server-side parsing.
        'Content-Type': undefined,
      },
    });
    return response.data;
  } catch (error) {
    const status = error.response?.status;

    let serverMessage;

    if (status === 413) {
      // 413 = Payload Too Large — from multer limit OR Express body-parser
      // Prefer the JSON message from our backend; fall back to a clear string.
      serverMessage =
        error.response?.data?.message ||
        'File too large. Maximum allowed size is 2MB.';
    } else if (error.code === 'ECONNABORTED') {
      serverMessage = 'Upload timed out. Please try a smaller image.';
    } else {
      // All other errors — use server's JSON message if present
      serverMessage =
        error.response?.data?.message ||
        'Failed to upload image. Please try again.';
    }

    // Re-throw as a plain Error so callers read error.message directly
    const uploadError = new Error(serverMessage);
    uploadError.response = error.response;
    throw uploadError;
  }
};

export default uploadImage;
