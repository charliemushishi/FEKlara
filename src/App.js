import React, { useState } from 'react';
import './App.css';
import Vault from './components/vault';
import dummyEmotes from './components/dummyemotes'; 
import Foundry from './components/foundry'; 
import Forge from './components/forge';


function App() {

  const [selectedContent, setSelectedContent] = useState('Emote'); // Default selected content

  const handleButtonClick = (content) => {
    setSelectedContent(content);
  };

  const renderConsoleContent = () => {
    if (selectedContent === 'Foundry') {
      return(
        <div className="console-box">
          <h1>Foundry</h1>
          <Foundry emotes={dummyEmotes} />
        </div>
      );
    } else if (selectedContent === 'Forge') {
      return (
        <div class="console-box">
          <h1>Forge</h1>
          <Forge></Forge>
        </div>
      );
    } else if (selectedContent === 'Vault') {
      return (
        <div class="console-box">
        <h1>Vault</h1>
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



