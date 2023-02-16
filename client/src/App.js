import React from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Index from './pages/Index';
import Error from './pages/Error';
import Book from './pages/Book';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/*" element={<Error/>}/>
          <Route path="/books" element={<Book title={"Min titel"} desc={"Detta är min beskrivning"}/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
