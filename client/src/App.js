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

import {HashRouter as Router, Route} from 'react-router-dom'

function App() {
  const [account, setAccount] = useState();

  useEffect(() => {
    setAccount(JSON.parse(window.localStorage.getItem('account')));
  }, []);

  return (
    <div className="App">
      {
        account ? 
        <Router basename="/">
          <Header/>
          <Route exact path="/">
              <Index/>
          </Route>
          <Route path="/*" component={Error}/>
          <Route path="/account">
            <Account user={account}/>
          </Route>
          <Route path="/register" component={Register}/>
          <Route path="/books/:id" component={Book}/>
          <Route path="/books/add" component={Add}/>
        </Router>
        :
        <><Login setAccount={setAccount}/></>
      }
    </div>
  );
}

export default App;
