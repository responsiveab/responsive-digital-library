import React from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Index from './pages/Index';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';
import Book from './pages/Book';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/*" element={<Error/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/books/:id" element={<Book/>}/>
        </Routes>
      </BrowserRouter>

      <Footer/>
    </div>
  );
}

export default App;
