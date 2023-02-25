import './css/Book.css'

import Tag from '../components/Tag'

import {
    useParams
} from "react-router-dom";

import React, {useEffect, useState} from 'react'
import axios from 'axios';

function Book(props) {
    let { id } = useParams();

    const [book, setBook] = useState({});
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/books/" + id)
        .then(res => {
            setBook(res.data.data)
            for(var i = 0; i < res.data.data.tags.length; i++) {
                axios.get("http://localhost:8080/api/tags/" + res.data.data.tags[i])
                .then(res => {
                    setTags(tags.concat([res.data.data.name]))
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    // eslint-disable-next-line
    }, [])

    return (
    <main className='Book-Wrapper'>
        <div className='Book-Header'>
            <div className='Book-Thumbnail'>
                <img src={book.imgstr} height='256px' alt="thumbnail"></img>
            </div>
            <div className='Book-Text'>
                <h1 className='Book-Title'>{book.title}</h1>
                <p className='Book-Desc'>{book.body}</p>
            </div>
        </div>
        <br/>
        <div className='Book-Meta'>
            <p className='Book-Date'><b>Published: </b>{book.published}</p>
            <p className='Book-Author'><b>Author: </b>{book.author}</p>
            <p className='Book-Category'><b>Category: </b>{book.category}</p>
            <p className='Book-Id'><b>ISBN: </b>{book._id}</p>
            <div className='Tags-Wrapper'>
                {tags.map((tag) => <Tag key={tag} content={tag} />)}
            </div>
        </div>

    </main>);
}

export default Book;