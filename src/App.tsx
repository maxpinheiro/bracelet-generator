import React from 'react';
import PatternList from './PatternList/PatternList';
import "./App.css";
import { Link } from 'react-router-dom';

const App = () => {

  return (
    <div className='app'>
      <p className='app-title'>Bracelet Pattern Creator</p>
      <PatternList />
    </div>
  );
}

export default App;
