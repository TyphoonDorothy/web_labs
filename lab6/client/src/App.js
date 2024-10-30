import React from 'react';
import Header from './components/header';
import Info from './components/info';
import Prev from './components/prev';
import Footer from './components/footer';
import './App.css'; 

const App = () => {
  return (
    <div className="App">
      <Header />
      <Info />
      <Prev />
      <Footer />
    </div>
  );
};

export default App;
