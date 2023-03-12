import React, {useEffect, useState} from 'react';
import './App.css';

import Header from './components/Header';

import Index from './pages/Index';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Book from './pages/Book';
import Add from './pages/Add';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    if(!window.localStorage.getItem('account')){
      setAccount(JSON.parse(window.localStorage.getItem('account')));
    }
    }, []);

  return (
    <div className="App">
      {
        account ? 
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/*" element={<Error/>}/>
            <Route path="/account" element={<Account user={account}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/books/:id" element={<Book/>}/>
            <Route path="/books/add" element={<Add/>}/>
          </Routes>
        </BrowserRouter>
        :
        <><Login setAccount={setAccount}/></>
      }
    </div>
  );
}

export default App;
