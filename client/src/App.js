import React from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import BookPreview from './components/BookPreview';

function App() {
  return (
    <div className="App">
      <Header/>
      <main className="App-content">
        <h1>Welcome to Responsive Digital Library</h1>
        <p>
          Here you will be able to keep track of your books.
        </p>
        <BookPreview title={"example title"} desc={"this book does not exist in real life"} id={9781933107981}/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
