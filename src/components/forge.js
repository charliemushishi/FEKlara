import React, { useState } from 'react';
import { uploadImage } from '../api.js'; // Update the path
import './forge.css';
import { useNotification } from './notificationcontext.js';
import EmoteCard from './emotecard.js';


const Forge = ({updateEmotes, updateFoundryEmotes}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null); // hold img url
    const [asciiEmote, setAsciiEmote] = useState(''); 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { addNotification } = useNotification(); 



    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAsciiEmoteChange = (event) => {
        setAsciiEmote(event.target.value); 
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    
    const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    };

    const handleUpload = async () => {
        let formEmoteData = {
            title: title,
            image: selectedFile || asciiEmote,
            description: description
        }
        try {
            // const formEmoteData = {};
            if (selectedFile) {
                formEmoteData['image'] = selectedFile;
            }
            if (asciiEmote) {
                formEmoteData['image'] = asciiEmote;
            }
            formEmoteData['title'] = title;
            formEmoteData['description'] = description;

            const response = await uploadImage(formEmoteData);

            setUploadedImage(response.imageUrl);

            addNotification('Emote uploaded successfully.', 'success');

            //resets fields
            setSelectedFile(null);
            setAsciiEmote('');
            setTitle('');
            setDescription('');
            //reset vault
            updateEmotes();
            //forces foundry to update
            updateFoundryEmotes();
        } catch (error) {
        console.error('Error uploading emote:', error);
        const errorMessage = error.response ? error.response.data.message : 'An error occurred while uploading the emote.';
        const emoteTitle = formEmoteData.title || 'without the title';
        const emoteImage = formEmoteData.image ? 'with image' : 'without image';
        const emoteDescription = formEmoteData.description ? `with description "${formEmoteData.description}"` : 'without description';
        const errorFullMessage = `Error, this don't work, ${emoteTitle} ${emoteImage} and ${emoteDescription}: ${errorMessage}`;
        addNotification(errorFullMessage, 'fail');
        
        }
    };
    

                
        
    return (
        <div className="emote-upload-form">
                    <div className='preview-box'>
                        {/* <EmoteCard className="thecard" emote={title || asciiEmote || uploadedImage || description ? { title, image: asciiEmote || uploadedImage, description } : { title: "title", image: "OwO", description:"the preview" }}  /> */}
                        <EmoteCard className="thecard" emote={{title: title || "title", image: asciiEmote || "OwO" , description: description || "the preview"}}  />




                    </div>

                <div className='form-inputs'>  
                    <input type="text" placeholder="ASCII emote" value={asciiEmote} onChange={handleAsciiEmoteChange} />
                    <input type="text" placeholder="title" value={title} onChange={handleTitleChange} />
                    <textarea placeholder="description" value={description} onChange={handleDescriptionChange} />
                    <button className="upButton" onClick={handleUpload}>Upload</button>
                </div>
        </div>
    );
    };

export default Forge;


//reset form when upload is successful