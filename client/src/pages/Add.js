import React, {useEffect, useState} from 'react'
import axios, * as others from 'axios';

function Add() {
    const [book, setBook] = useState({
        title:"",
        body:"",
        author:""
    })

    const [id, setId] = useState(undefined);

    function fetchBook() {
        var isbn = require('node-isbn');
        isbn.resolve(id, function (err, fetched_book) {
            if (err) {
                console.log('Book not found', err);
            } else {
                console.log(fetched_book)
                book.title = fetched_book.title
                book.body = fetched_book.description
                book.author = fetched_book.authors[0]
                console.log(book)
                addBook();
            }
        });
    }

    const addBook = () => {
        if (book) {
         axios.post("http://localhost:8080/api/books/", book)
         .then(res=>console.log(res))
         .catch(err=>console.log(err))
        }
        else {
            alert("invalid input")
        }
    }

    return (
    <>
        <form action='#'>
            <input type="text" id="isbn" name="isbn" onInput={e => setId(e.target.value)}/>
            <button type="submit" onClick={fetchBook}>Fetch Book</button>
        </form>
    </>);
}

export default Add;