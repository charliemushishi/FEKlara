import React, { useState } from 'react';
import './foundry.css'; 
import { useEmoteContext } from '../EmoteContext';
import axios from 'axios';

const Foundry = ({ emotes }) => {
    const [selectedEmote, setSelectedEmote] = useState(null); // State to track the selected emote
    const { updateSelectedEmote } = useEmoteContext();


const handleEmoteClick = async (emote) => {
    updateSelectedEmote(emote);
    setSelectedEmote(emote); 

     // Send emote to the backend
    try {
        console.log('Sending emote to backend:', emote);
        const response = await axios.post('https://klara-be-api.onrender.com/emotes/currentemote', emote)

        console.log('Backend response:', response.data); 
        return response.data; 
        
    }   catch (error) {
        throw error; 
    }
};




return (
    <div className="foundry">
    <div className="display-area">
        {selectedEmote ? (
            
        // <img src={selectedEmote.image} alt={selectedEmote.description} />
        <p>{selectedEmote.image}</p>
        ):( 
        <p className="emote-placeholder">Choose emote</p>
        )}

    </div>
    <div className="emote-grid">
        {emotes.map((emote) => (
            
        <button
            
            key={emote.id}
            className="emote-button"
            onClick={() => handleEmoteClick(emote)}
        >
            
        {/* <svg width="100%" height="100%" class="border">
        <polyline points="189,0 189,69 0,69 0,0 189,1" class="bg-line" />
        <polyline points="189,0 189,69 0,69 0,0 189,1" class="hl-line" />
        </svg> */}
            <span className='title-box'>{emote.title}</span>
            
        </button>
        ))}
    </div>
    </div>
);
};

export default Foundry;
