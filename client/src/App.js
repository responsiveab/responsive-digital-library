import React from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <main className="App-content">
        <h1>Welcome to Responsive Digital Library</h1>
        <p>
          Here you will be able to keep track of your books.
        </p>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
