import { useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import RandomTextPage from './pages/RandomTextPage.jsx';

function App() {
 


  return (
    <div className="app-container">
      <Sidebar />
      <RandomTextPage/>
    </div>
  );
}

export default App;