import React from 'react';
import './App.css';

import HeaderWithoutSearch from './components/HeaderWithoutSearch';

import HeaderIndex from './pages/HeaderIndex';
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
        <Routes>
          <Route path="/" element={<HeaderIndex/>}/>
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
