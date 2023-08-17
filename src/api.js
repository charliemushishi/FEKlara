import axios from 'axios';

const API_URL = 'https://klara-be-api.onrender.com'; // update with backend

export const uploadImage = async (formEmoteData) => {
    try {

        const response = await axios.post(`${API_URL}/emotes`, formEmoteData)

        return response.data; 
    }   catch (error) {
        throw error; 
    }
};


export const fetchEmotes = async () => {
    try {
        const response = await axios.get(`${API_URL}/emotes`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteEmotes = async (emote_id) => {
    try {
        console.log('Calling deleteEmotes with emote_Id:', emote_id);
        const response = await axios.delete(`${API_URL}/emotes/${emote_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}; 
    
export const updateEmoteFields = async (emote_id,field,newValue) => {
    try {
        const reponse = await axios.put(`${API_URL}/emotes/${emote_id}/${field}`, {
            [field]: newValue
        });
        return reponse.data;
    }catch (error){
        throw error;
    }
};


