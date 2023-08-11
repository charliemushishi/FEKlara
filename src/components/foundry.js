import React, { useState } from 'react';
import EmoteCard from './emotecard';
import './foundry.css'; 

const Foundry = ({ emotes }) => {
    const [selectedEmote, setSelectedEmote] = useState(null); // State to track the selected emote

// Function to handle emote button click
const handleEmoteClick = (emote) => {
    setSelectedEmote(emote); // Set the selected emote when a button is clicked
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
            {emote.title}
        </button>
        ))}
    </div>

    </div>
);
};

export default Foundry;
