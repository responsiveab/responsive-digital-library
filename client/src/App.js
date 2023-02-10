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
        <BookPreview title={"Study Manual for the Test of Essential Academic Skills"} desc={"This book is written by Assessment Technologies Inc. Staff"} id={9781933107981}/>
        <BookPreview title={"Preparing for the Biology AP* Exam"} desc={"Good for students"} id={9780133458145}/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
