import React from 'react';
import './emotecard.css';




const EmoteCard = ({ emote, onClick }) => {

    
    return (
        <div className='card-back'>
        <div className="emote-card"  onClick={onClick}>
        <p className='title'>{emote.title}</p>

        {(() =>
            {switch(true) {
                case emote === null :
                return null;
                case emote.image.indexOf("http") === 0:
                return <img src={emote.image} className="theimage" alt={emote.description} />;
                default:
                return <p>{emote.image}</p>;
                }
            })()}

        
        <p className='description'>{emote.description}</p>
        </div>
        </div>
    );
    };

export default EmoteCard;
