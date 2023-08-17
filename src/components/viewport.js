import React from 'react';
import './viewport.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Viewport = () => {

    const [currentEmote, setCurrentEmote] = useState(null);

    // Fetch the emote data from the backend
    const fetchCurrentEmote = async () => {
        try {
            const response = await axios.get('https://klara-be-api.onrender.com/emotes/currentemote');
            console.log('Response from backend:', response.data);
            setCurrentEmote(response.data);
        } catch (error) {
            console.error('Error fetching current emote:', error);
        }
    };


    useEffect(() => {
        const intervalId = setInterval(fetchCurrentEmote, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className='viewbackground'>
            <div className='landingdescript'>
            <p> Welcome to the Viewport page!</p>
            <p>here you can view the emotes expressed by your friends</p>
            </div>
            <div className='viewportbox'>
            <div className='evbox'>
            <div className='viewportitle'>Current Emote:</div>
            <div className='ebox'>
            {currentEmote && currentEmote.emote ? (
        <div>
            <p>{currentEmote.emote.title}</p>
            <p>{currentEmote.emote.image}</p>
            <p>{currentEmote.emote.description}</p>
        </div>
    ) : (
        <p>No emote selected</p>
    )}
        </div>
        </div>
        </div>
        </div>
    );
};



export default Viewport;
