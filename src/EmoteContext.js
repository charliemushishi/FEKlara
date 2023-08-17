// EmoteContext.js
import React, { createContext, useContext, useState } from 'react';

const EmoteContext = createContext();

export const EmoteProvider = ({ children }) => {
    const [selectedEmote, setSelectedEmote] = useState(null);

    const updateSelectedEmote = (emote) => {
        setSelectedEmote(emote);
    };

    console.log("EmoteProvider - selectedEmote:", selectedEmote); // Add this line


    return (
        <EmoteContext.Provider value={{ selectedEmote, updateSelectedEmote }}>
            {children}
        </EmoteContext.Provider>
    );
};

export const useEmoteContext = () => {
    return useContext(EmoteContext);
};