import axios from 'axios';

const API_URL = 'your_backend_url_here'; // update with backend

export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });

        return response.data; // Return any relevant data from the response
    }   catch (error) {
        throw error; // Handle errors or return specific error messages
    }
};

