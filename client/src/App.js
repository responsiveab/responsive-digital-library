import React, {useEffect, useState} from 'react';
import './App.css';

// import Header from './components/headers/Header';

import Index from './pages/Index';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Book from './pages/Book';
import Add from './pages/Add';
import HeaderIndex from './components/headers/HeaderIndex';

import {HashRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    try {
      const accountData = window.localStorage.getItem('account');
      if (accountData) {
        setAccount(JSON.parse(accountData));
      }
    } catch (e) {
      console.error('Error parsing account data:', e);
    }
  }, [account]);

  return (
    <div className="App">
      {
        account ? 
        <Router basename="/">
          <Routes>
            <Route path="/" element={<HeaderIndex user={account}/>}/>
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
