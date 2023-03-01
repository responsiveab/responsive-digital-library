import React, {useState} from 'react'
import axios from 'axios';

import {BiPlusCircle} from "react-icons/bi";

import Tag from '../components/Tag'

import './css/Add.css'

function Add() {
    const [book, setBook] = useState(undefined)

    const [isbnNr, setIsbnNr] = useState(undefined);
    const [tag, setTag] = useState(undefined);

    const [tags, setTags] = useState([]);

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
                    author:fetched_book.authors[0],
                    //category:fetched_book.categories[0],
                    //img:fetched_book.imageLinks.thumbnail,
                    //language:fetched_book.language,
                    publisher:fetched_book.publisher,
                    date:fetched_book.publishedDate
                }
                setBook(newBook);
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
                    .then(res=> {
                        console.log(res)
                        for(var i = 0; i < tags.length; i++) {
                            addTag(tags[i])
                        }
                        setTags([])
                    })
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

    const appendTag = () => {
        tags.push(tag)
        setTag('')
    }

    const addTag = (t) => {
        let newTag = {
            name: t,
            slug: t.toLowerCase()
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
            {
                isbnNr && (isbnNr.length > 8) &&
                (book ? <div className='outline'>
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
                </div> : <button type='button' id="isbn-submit" onClick={fetchBook}>Hämta bok</button>)
            }
        </form>
    </>);
}

export default Add;