import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NumberIterator } from './components/NumberIterator';
import { PonyLister } from './components/PonyLister';

function App() {
  return (
    <div className="App">
      <NumberIterator/>
      <PonyLister/>
    </div>
  );
}

export default App;
