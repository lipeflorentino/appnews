// Importando o React
import React, { Component } from 'react';
        
// Importando o component Main
import Main from './main'

class App extends Component {
  render() {
    return (
      <div id="app-container" className="light-mode">
        <Main />
      </div>
    );
  }
}

export default App;