import React, { useState } from 'react';
import './App.css';
import Vault from './components/vault';
import dummyEmotes from './components/dummyemotes'; 
import Foundry from './components/foundry'; 



function App() {

  const [selectedContent, setSelectedContent] = useState('Emote'); // Default selected content

  const handleButtonClick = (content) => {
    setSelectedContent(content);
  };

  const renderConsoleContent = () => {
    if (selectedContent === 'Foundry') {
      return(
        <div class="console-box">
          <Foundry></Foundry>
        </div>
      );
    } else if (selectedContent === 'Forge') {
      return (
        <p>its the FORGE</p>
      );
    } else if (selectedContent === 'Vault') {
      return (
        <div class="console-box">
        <h1>Emote Vault</h1>
        <Vault emotes={dummyEmotes} />
      </div>
      );
    }
  };

  return (
    <div className="App">
      <div class="grid-container">
        <div class="notifications">notifications
          <div class="sprite">allo</div>
        </div>

        <div class="navigation">navigation
          <div class="nav-buttons">
          <button class="button" onClick={() => handleButtonClick('Foundry')}>Foundry</button>
          <button class="button"  onClick={() => handleButtonClick('Forge')}>Forge</button>
          <button class="button" onClick={() => handleButtonClick('Vault')}>Vault</button>
          </div>
        </div>
        
        <div class="console">console
        {renderConsoleContent()}
        </div>

      </div>
    </div>
  );
}

export default App;



