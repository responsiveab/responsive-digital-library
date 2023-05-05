import React, {useEffect, useState} from 'react';
import './App.css';

import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Book from './pages/Book';
import Add from './pages/Add';
import HeaderIndex from './components/headers/HeaderIndex';

import {HashRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  const [account, setAccount] = useState(); //TODO: Remove this

  useEffect(() => {
    try { //TODO: This should be removed, instead check for valid token
          //or cache if logged in
      const accountData = window.localStorage.getItem('account');
      if (accountData) {
        setAccount(JSON.parse(accountData));
      }
    } catch (e) {
      console.error('Error parsing account data:', e);
    }
  }, []);

  return (
    <div className="App">
      {
        account ? // TODO: This type of thing should not happen anymore. 
                  // you could for example make function call check_token
                  // (you would of course need to implement this)
        <Router basename="/">
          <Routes>
            <Route path="/" element={<HeaderIndex user={account}/>}/>
            <Route path="/account" element={<Account user={account}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/books/:id" element={<Book user={account}/>}/>
            <Route path="/books/add" element={<Add user={account}/>}/>
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
