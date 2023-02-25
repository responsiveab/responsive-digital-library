import React from 'react';
import './App.css';

import Header from './components/Header';

import Index from './pages/Index';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';
import Book from './pages/Book';
import Add from './pages/Add';

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
          <Route path="/books/add" element={<Add/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
