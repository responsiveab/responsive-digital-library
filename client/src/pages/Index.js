import BookPreview from "../components/BookPreview"
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//import Header from './../components/Header';

import {Link} from 'react-router-dom';
import {BiPlusCircle, BiUserCircle, BiHome, BiSearch, BiFilter} from "react-icons/bi";
//import './css/Header.css'

function Header() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  
    return (
      <main className="App-content">
        <header className="App-header">
            <div style={{ float: 'left' }}>
                <Link to="/books/add">
                    <BiPlusCircle className="icon"/>
                </Link>
            </div>
            <div style={{ float: 'right' }}>
                <Link to="/account">
                    <BiUserCircle className="icon"/>
                </Link>
                <Link to="/">
                    {/* Placeholder for Responsive logo */}
                    <BiHome className="icon"/>
                </Link>
            </div>
            <div className='searchbar'>
                <BiSearch className="icon" id="search-left"/>
                <input 
                  type="text" 
                  id="search" 
                  name="search"
                  onChange={inputHandler}
                  />
                <BiFilter className="icon" id="search-right"/>
            </div>
            <hr/>
        </header>
        <div className="Index">
          <Index input={inputText}/>
        </div>
      </main>
        );
}

// export default Header;
function Index(props) {
  const [books, setBooks] = useState(undefined)

  useEffect(() => {
    axios.get("http://localhost:8080/api/books/")
    .then(res => setBooks(res.data.data))
    .then(console.log(books))
  // eslint-disable-next-line
  }, [])
  let booksToShow = books;
  if ((props.input)) {
    for (let key in books) {
      var book = books[key]
      if(!book['title'].toLowerCase().includes(props.input)) {
        delete booksToShow[key];
      }
      // else if (!book['body'].toLowerCase().includes(props.input)){
      //   delete booksToShow[key];
      // }
      // else if (!book['author'].toLowerCase().includes(props.input)){
      //   delete booksToShow[key];
      // }
      // else if (!book['taglis'].toLowerCase().includes(props.input)){
      //   delete booksToShow[key];
      // }
    }
  }
    return (
    <main className="App-content">
      <Results booksToShow={booksToShow}/>
    </main>);
}

export default Header;

function Results(props) {
  return (
    <main className="App-content">
      {
            props.booksToShow ? props.booksToShow.map((book) => <span key={book._id}><BookPreview id={book._id} 
                                                                          title={book.title} 
                                                                          body={book.body} 
                                                                          author={book.author}
                                                                          shelf={book.shelf}
                                                                          category={book.category}
                                                                          language={book.language}
                                                                          publisher={book.publisher}
                                                                          date={book.published}
                                                                          img={book.imgstr}
                                                                          taglis={book.tags}/></span>) : <></>
          }
    </main>
  );
}