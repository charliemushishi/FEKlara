import React, { useState } from 'react';
import { uploadImage } from '../api.js'; // Update the path
import './forge.css';

const Forge = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null); // hold img url
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    
    const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('image', selectedFile);
                formData.append('title', title);
                formData.append('description', description);
        
                const response = await uploadImage(formData);
                setUploadedImage(response.imageUrl);
                } catch (error) {
                console.error('Error uploading image:', error);
        }
    }
    };
    return (
        <div className="emote-upload-form">

        <div className="image-box">
            {uploadedImage ? (
            <img src={uploadedImage} alt="Uploaded Emote" />
            ) : (
            <div className="upload-placeholder">Upload Here
            <div className='form-inputs'></div>
            <label className='upload-button'>
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>
            <button onClick={handleUpload}>Upload</button>
            </div>
            )}
            <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
            <textarea placeholder="Description" value={description} onChange={handleDescriptionChange} />
        </div>
        
        
        </div>
    );
    };

export default Forge;
