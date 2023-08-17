import React from 'react';
import './emotecard.css';

const EmoteCard = ({ emote, onClick }) => {
    return (
        <div className='card-back'>
        <div className="emote-card"  onClick={onClick}>
        <p className='title'>{emote.title}</p>
        {/* <img src={emote.image} alt={emote.description} /> */}
        <p className='image'>{emote.image}</p>
        <p className='description'>{emote.description}</p>
        </div>
        </div>
    );
    };

export default EmoteCard;
