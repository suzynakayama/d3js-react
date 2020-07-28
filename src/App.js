import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="container">
      <Header />
      <Sidebar />
    </div>
  );
}

export default App;
