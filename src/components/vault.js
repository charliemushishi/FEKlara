import React from 'react';
import EmoteCard from './emotecard';
import './vault.css';


const Vault = ({ emotes }) => {
    return (
        <div className="Vault-Board">
            {emotes.map((emote, id) => (
                <EmoteCard key={id} emote={emote} />
            ))}
        </div>
    );
    };

export default Vault;

