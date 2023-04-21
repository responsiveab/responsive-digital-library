import React, {useState} from 'react'
import axios from 'axios';

import {BiPlusCircle} from "react-icons/bi";

import Tag from '../components/Tag'

import './css/Add.css'

import {
    useNavigate
} from "react-router-dom";
import HeaderWithoutSearch from '../components/headers/HeaderWithoutSearch';

function Add() {
    const [book, setBook] = useState(undefined)

    const [isbnNr, setIsbnNr] = useState(undefined);
    const [tag, setTag] = useState(undefined);

    const [tags, setTags] = useState([]);

    //let navigate = useNavigate();
    const routeToIndex = () =>{
        //navigate('/');
    }

    function fetchBook() {
        var isbn = require('node-isbn');
        isbn.resolve(isbnNr, function (err, fetched_book) {
            if (err) {
                console.log('Book not found', err);
            } else {
                let newBook = {
                    id:isbnNr,
                    title:(fetched_book.title ? fetched_book.title : "Titel saknas"),
                    body:(fetched_book.description ? fetched_book.description : "Beskrivning saknas"),
                    author:(fetched_book.authors ? fetched_book.authors[0] : "Okänd författare"), 
                    category:(fetched_book.categories ? fetched_book.categories[0] : "Okategoriserad"),
                    img:(fetched_book.imageLinks ? fetched_book.imageLinks.thumbnail : "Bild saknas"),
                    language:(fetched_book.language ? fetched_book.language : "Okänt språk"),
                    publisher:(fetched_book.publisher ? fetched_book.publisher : "Okänt förlag"),
                    date:(fetched_book.publishedDate ? fetched_book.publishedDate : "Okänt publiceringsdatum")
                }
                setBook(newBook);
                // Hide input field
                document.getElementById('isbn-input').style.display = 'none';
            }
        })
    }

    const addBook = () => {
        axios.get("http://localhost:8080/api/books/" + isbnNr)
        .then(res => {
            if(!res.data.data) {
                if (book) {
                    book.token = window.localStorage.getItem('token')
                    axios.post("http://localhost:8080/api/books/", book)
                    .then(res=> {
                        console.log(res)
                        for(var i = 0; i < tags.length; i++) {
                            addTag(tags[i])
                        }
                        setTags([])
                        
                        // make submit button green and wait 0.5s before resetting state and input fields
                        document.getElementById('isbn-submit').style.backgroundColor = '#77DD77';
                        setTimeout(() => {
                            setBook(undefined);
                            setIsbnNr(undefined);
                            setTag(undefined);
                            document.getElementById('isbn-input').value = '';
                            document.getElementById('isbn-input').style.display = 'block';
                            document.getElementById('isbn-input').focus();
                        }, 500);

                        routeToIndex()
                    })
                    .catch(err=>console.log(err))
                }
                else {
                    alert("invalid input")
                }
            }
            else {
                alert("Boken finns redan i databasen")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const cancelBook = () => {
        // reset state and input fields
        setBook(undefined);
        setIsbnNr(undefined);
        setTag(undefined);
        document.getElementById('isbn-input').value = '';
        document.getElementById('isbn-input').style.display = 'block';
        document.getElementById('isbn-input').focus();
    }

    const appendTag = () => {
        tags.push(tag)
        setTag('')
        document.getElementById('tag-input').value = ''
    }

    const addTag = (t) => {
        let newTag = {
            name: t
        }
        axios.post("http://localhost:8080/api/tags/", newTag)
        .then(res=> {
            let modifiedFields = {
                tag: res.data.data
            }
            console.log(modifiedFields)
            axios.patch("http://localhost:8080/api/tags/" + isbnNr, modifiedFields)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err=>console.log(err))
    }

    return (
    <>
        <HeaderWithoutSearch/>
        <form action='#' className='add-book-form'>
            <input type="text" id="isbn-input" name="isbn" placeholder='ISBN' onInput={e => setIsbnNr(e.target.value)}/>
            {
                isbnNr && (isbnNr.length > 8) &&
                (book ? <div className='outline'>
                        { (book.img !== "Bild saknas") ? <div className="CoverImage-Wrapper">
                        {
                            <img src={book.img} width="128px" alt="cover"></img>
                        }
                        </div> : <></>}
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <p><i>{book.body}</i></p>
                        <p><b>{book.id}</b></p>

                        {
                            tags ? <div>{tags.map((t) => <Tag key={t} content={t} />)}</div> : <></>
                        }

                        <input type="text" id="tag-input" name="tag" placeholder="tagg" onInput={e => setTag(e.target.value)}/>
                        <button type='button' id="tag-submit" onClick={appendTag}><BiPlusCircle/></button>
                    <button type='button' id="isbn-submit" onClick={addBook}>Lägg till bok</button>
                    <button type='button' id="isbn-cancel" onClick={cancelBook}>Avbryt</button>

                </div> : <button type='button' id="isbn-submit" onClick={fetchBook}>Hämta bok</button>)
            }
        </form>
    </>);
}

export default Add;