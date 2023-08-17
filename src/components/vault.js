import React, {useState} from 'react';
import EmoteCard from './emotecard';
import './vault.css';
import { deleteEmotes, updateEmoteFields } from '../api';
import { useNotification } from './notificationcontext';

const Vault = ({ emotes, updateEmotes }) => {

    const [selectedEmoteId, setSelectedEmoteId] = useState(null);
    const [selectedEmote, setSelectedEmote] = useState(null);
    const [selectedEmoteTitle, setSelectedEmoteTitle] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { addNotification } = useNotification(); 
    const [updateField, setUpdateField] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);



    const handleEmoteSelect = (emoteId,emote,emoteTitle) => {
        setSelectedEmote(emote);
        setSelectedEmoteId(emoteId);
        setSelectedEmoteTitle(emoteTitle);
        setShowConfirmation(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedEmoteId !== null) {
            try {
                await deleteEmotes(selectedEmoteId);
                setSelectedEmoteId(null);
                setShowConfirmation(false);
                updateEmotes();
                addNotification('Emote deleted succesfully', 'success')
            } catch (error) {
                console.error('Error deleting emote:', error);
                addNotification('Emote could not be deleted')
            }
        }
    };

    const handleDeleteCancel = () => {
        setSelectedEmoteId(null);
        setShowConfirmation(false);
    };

    const handleUpdateFieldChange = (event) => {
        setUpdateField(event.target.value);
    };

    const handleFieldSelect = (field) => {
    
        if (field === selectedField) {
            setSelectedField("Fields");
            setShowOptions(!showOptions)
            } else {
            setSelectedField(field);
            setShowOptions(false);
            }
        setUpdateField(''); 
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://klara-be-api.onrender.com/emotes/search?query=${searchQuery}`);
            const data = await response.json();

            
            console.log(data);
            if (Array.isArray(data)) {
                if (data.length > 0) {
                    setSearchResults(data);
                    setSearchPerformed(true);
                } else {
                    setSearchResults([]);
                    setSearchPerformed(true);
                }
            } else {

            setSearchResults(data); 
            setSearchPerformed(true); 
            }
        } catch (error) {
            console.error('Error searching emotes:', error);
        }
        };
    



    const handleUpdate = async () => {
        try {
            //LOOOOGGG
            console.log('Selected Emote ID:', selectedEmoteId);
            console.log('Selected Field:', selectedField);
            console.log('Update Field:', updateField);


            await updateEmoteFields(selectedEmoteId, selectedField, updateField);
        
            const updatedEmotes = emotes.map((emote) =>
                emote.id === selectedEmoteId
                    ? { ...emote, [selectedField]: updateField }
                    : emote
            );
            updateEmotes(updatedEmotes); 
            setUpdateField('');
            setSelectedField(''); 
            addNotification('Emote field updated successfully');
        } catch (error) {
            console.error('Error updating emote field:', error);
            addNotification('Emote field could not be updated');
        }
    };

    const clearSearch = () => {
        setSearchResults([]);
        setSearchPerformed(false);
        setSearchQuery('');
        updateEmotes(); // Reset to original emotes
    };

    return (
        
            <div className="vault-container">
                <div className='searchfieldscontainer'>
                <input className='searchfield'
                type="text"
                placeholder="search by keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <div className='searchbuttons'>
                <button onClick={handleSearch}>search</button>
                <button onClick={clearSearch}>clear</button>
                </div>
                </div>
            <div className='response-box'> 
                {selectedEmoteId !== null && (
                <div className="Delete-Prompt">


                <div className='selectedEmoteDisplay'>
                {(() =>
                    {switch(true) {
                        
                        case selectedEmote.indexOf("http") === 0:
                        return <img src={selectedEmote} alt={selectedEmote} />;
                        default:
                        return <p>{selectedEmote}</p>;
                        }
                    })()}
                </div>

                    <p>selected emote: {selectedEmoteTitle}</p>
                    {showConfirmation ? (
                    <div className='responseMessage'>
                        <div className='responseFields'>
                        <div className='custom-dropdown'>
                            <div className='selected-option' onClick={() => handleFieldSelect(showOptions ? 'Fields' : selectedField)}>
                            {selectedField ? selectedField : 'Select Field'}
                            </div>
                            {showOptions && (
                            <ul className='options'>
                            <li onClick={() => handleFieldSelect('title')}>title</li>
                            <li onClick={() => handleFieldSelect('description')}>description</li>
                            <li onClick={() => handleFieldSelect('image')}>image</li>
                            </ul>
                            )}
                        </div>
                        <div className='input-field'>
                            <input
                                type="text"
                                placeholder={`update ${selectedField} here`}
                                value={updateField}
                                onChange={handleUpdateFieldChange}
                            />
                            </div>
                            </div>
                        <p>Would you like to update or delete this emote?</p>
                        <div className='responseButton'>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={handleDeleteConfirm}>Yes</button>
                        <button onClick={handleDeleteCancel}>No</button>
                        </div>
                    </div>
                    ) : (
                    <button onClick={() => setShowConfirmation(true)}>Delete</button>
                    )}
                </div>
                )}
            </div>

            <div className="Vault-Board">
                {searchPerformed ? (
                searchResults.length > 0 ? (
                searchResults.map((emote) => (
                    <EmoteCard
                        key={emote.id}
                        emote={emote}
                        onClick={() => handleEmoteSelect(emote.id, emote.image, emote.title)}
                        isSelected={
                            selectedEmoteId === emote.id &&
                            selectedEmote === emote.image &&
                            selectedEmoteTitle === emote.title
                        }
                    />
                ))
                ) : (
                <p className="noresponse">No search results found.</p>
                )
                ) : (
                emotes.map((emote) => (
                    <EmoteCard
                    key={emote.id}
                    emote={emote}
                    onClick={() => handleEmoteSelect(emote.id, emote.image, emote.title)}
                    isSelected={
                        selectedEmoteId === emote.id &&
                        selectedEmote === emote.image &&
                        selectedEmoteTitle === emote.title
                    }
                    />
                ))
                )}


            </div>
            </div>
        );
        };
        

export default Vault;

//state vault reset on upload