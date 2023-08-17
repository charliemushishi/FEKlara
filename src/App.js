import React, { useState, useEffect } from 'react';
import './App.css';
import Vault from './components/vault';
import Foundry from './components/foundry'; 
import Forge from './components/forge';
import './api';
import {fetchEmotes} from './api';
import {NotificationProvider} from './components/notificationcontext';
import CustomNotification from './components/notifications';
import { EmoteProvider } from './EmoteContext'


function App() {

  const [selectedContent, setSelectedContent] = useState('Foundry'); // Default selected content
  const [emotes, setEmotes] = useState([]); // State to hold fetched emotess
  const [notifications, setNotifications] = useState([]); // Initialize notifications state
  

  const updateEmotes = async () => {
    try {
      const updatedEmotes = await fetchEmotes();
      setEmotes(updatedEmotes);
    } catch (error) {
      console.error('Error updating emotes:', error);
    }
  };

  const updateFoundryEmotes = async () => {
    try {
      const updatedEmotes = await fetchEmotes();
      setEmotes(updatedEmotes);
    } catch (error) {
      console.error('Error updating Foundry emotes:', error);
    }
  };


  useEffect(() => {
    // Fetch emotes when the component mounts
    fetchEmotes()
      .then(data => {
        setEmotes(data); // Update the emotes state with fetched data
      })
      .catch(error => {
        console.error('Error fetching emotes:', error);
      });
  }, []); // Run only once when the component mounts


  const handleButtonClick = (content) => {
    setSelectedContent(content);
  };

  const renderConsoleContent = () => {
    if (selectedContent === 'Foundry') {
      return(
        <div className="console-box">
          <h1>Foundry
          <p>select an emote to display</p>
          </h1>
          <EmoteProvider><Foundry emotes={emotes} /></EmoteProvider>
        </div>
      );
    } else if (selectedContent === 'Forge') {
      return (
        <div class="console-box">
          <h1>Welcome to the Forge!
            <p>upload new emotes here</p>
          </h1>
          <Forge updateEmotes={updateEmotes} updateFoundryEmotes={updateFoundryEmotes}></Forge>
        </div>
      );
    } else if (selectedContent === 'Vault') {
      return (
        <div class="console-box">
        <h1>Vault
        <p>browse edit and delete here</p>
        </h1>
        
        <Vault emotes={emotes} updateEmotes={updateEmotes} />
      </div>
      );
    }
  };

  return (
    <EmoteProvider>
    <NotificationProvider>
      <div className='app-container'>
    <header className='hero'>Kinetic Language Assistant & Resource Aparatus</header>
          <div className="App">
            <div class="grid-container">
              <div className='sidebar'>
                <div class="notifications">
                </div>
                <CustomNotification></CustomNotification>

                  <div class="navigation">
                  <p>navigation</p>
                    <div class="nav-buttons">
                    <button class="button" onClick={() => handleButtonClick('Foundry')}>foundry</button>
                    <button class="button"  onClick={() => handleButtonClick('Forge')}>forge</button>
                    <button class="button" onClick={() => handleButtonClick('Vault')}>vault</button>
                    </div>
                  
                </div>
              </div>

              <div class="console">
              {renderConsoleContent()}
              {/* {selectedContent === 'Forge' && <Forge addNotification={addNotification} />} */}
              </div>

            </div>
          </div>
        <footer>&copy; Chacha. All rights reserved.</footer>
        </div>
    </NotificationProvider>
    </EmoteProvider>
  );
}

export default App;



