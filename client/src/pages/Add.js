import React, {useEffect, useState} from 'react'
import axios, * as others from 'axios';

import './css/Add.css'

function Add() {
    /* 
    {
        id:"isbnNr",
        title:"fetched_book.title",
        body:"fetched_book.description",
        author:"fetched_book.authors[0]"
    }
    */
    const [book, setBook] = useState(undefined)

    const [isbnNr, setIsbnNr] = useState(undefined);
    const [tag, setTag] = useState(undefined);

    function fetchBook() {
        var isbn = require('node-isbn');
        isbn.resolve(isbnNr, function (err, fetched_book) {
            if (err) {
                console.log('Book not found', err);
            } else {
                let newBook = {
                    id:isbnNr,
                    title:fetched_book.title,
                    body:fetched_book.description,
                    author:fetched_book.authors[0]
                }
                setBook(newBook);
                addBook();
            }
        })
    }

    // TODO: Move temporary removeBook function to better location
    const removeBook = () => {
        axios.delete("http://localhost:8080/api/books/" + isbnNr)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const addBook = () => {
        axios.get("http://localhost:8080/api/books/" + isbnNr)
        .then(res => {
            console.log(res)
            if(!res.data.data) {
                if (book) {
                    axios.post("http://localhost:8080/api/books/", book)
                    .then(res=>console.log(res))
                    .catch(err=>console.log(err))
                }
                else {
                    alert("invalid input")
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const addTag = () => {
        let newTag = {
            name: tag,
            slug: 'tag-1'
        }
        axios.post("http://localhost:8080/api/tags/", newTag)
        .then(res=> {
            console.log(res)
            let modifiedFields = {
                tag: res.data.data
            }
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
        <form action='#' className='add-book-form'>
            <input type="text" id="isbn-input" name="isbn" placeholder='ISBN' onInput={e => setIsbnNr(e.target.value)}/>
            <button type="submit" id="isbn-submit" onClick={fetchBook}>Lägg till bok</button>
        </form>
        <div>
            {
                book && 
                <>
                    <form action='#' className='edit-book-form'>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <p><i>{book.body}</i></p>
                        <p><b>{book.id}</b></p>
                        <input type="text" id="tag-input" name="tag" placeholder="tagg" onInput={e => setTag(e.target.value)}/>
                        <button type="submit" id="tag-submit" onClick={addTag}>Lägg till tagg</button>
                    </form>
                </>
            }
        </div>
    </>);
}

export default Add;