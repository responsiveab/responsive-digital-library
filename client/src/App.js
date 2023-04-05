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

import {HashRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  const [account, setAccount] = useState(undefined);

  useEffect(() => {
    setAccount(JSON.parse(window.localStorage.getItem('account')));
  }, []);

  return (
    <div className="App">
      {
        account ? 
        <Router basename="/">
          <Header/>
          <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/account" element={<Account user={account}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/books/:id" element={<Book/>}/>
            <Route path="/books/add" element={<Add/>}/>
            <Route path="/*" element={<Error/>}/>
          </Routes>
        </Router>
        :
        <><Login setAccount={setAccount}/></>
      }
    </div>
  );
}

export default App;
