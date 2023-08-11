import React from 'react';
import './emotecard.css';

const EmoteCard = ({ emote }) => {
    return (
        <div className="emote-card">
        <p className='title'>{emote.title}</p>
        {/* <img src={emote.image} alt={emote.description} /> */}
        <p className='image'>{emote.image}</p>
        <p className='description'>{emote.description}</p>
        
        </div>
    );
    };

export default EmoteCard;
