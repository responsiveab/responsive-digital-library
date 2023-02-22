import React, {useEffect, useState} from 'react'
import axios, * as others from 'axios';

function Add() {
    const [book, setBook] = useState({
        id:"",
        title:"",
        body:"",
        author:""
    })

    const [isbnNr, setIsbnNr] = useState(undefined);

    function fetchBook() {
        var isbn = require('node-isbn');
        isbn.resolve(isbnNr, function (err, fetched_book) {
            if (err) {
                console.log('Book not found', err);
            } else {
                book.id = isbnNr
                book.title = fetched_book.title
                book.body = fetched_book.description
                book.author = fetched_book.authors[0]
                addBook();
            }
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

    return (
    <>
        <form action='#'>
            <input type="text" id="isbn" name="isbn" onInput={e => setIsbnNr(e.target.value)}/>
            <button type="submit" onClick={fetchBook}>Fetch Book</button>
        </form>
    </>);
}

export default Add;