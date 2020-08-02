import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="container">
      <Header />
      <Dashboard />
      <Sidebar />
    </div>
  );
}

export default App;
