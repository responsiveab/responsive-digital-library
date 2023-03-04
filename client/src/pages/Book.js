import './css/Book.css'

import Tag from '../components/Tag'

import {
    useParams
} from "react-router-dom";

import React, {useEffect, useState} from 'react'
import axios, * as others from 'axios';
import ContentEditable from 'react-contenteditable'

function Book(props) {
    let { id } = useParams();

    const [title, setTitle] = useState(undefined);
    const [subtitle, setSubtitle] = useState(undefined);
    const [desc, setDesc] = useState(undefined);
    const [date, setDate] = useState(undefined);
    const [author, setAuthor] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    const [img, setImg] = useState(undefined);
    const [showResults, setShowResults] = useState(undefined);

    // TODO: fetch tags from our database
    const [tags, setTags] = useState([]);
 
    const [book, setBook] = useState({
        id:id,
        title:"",
        subtitle:"",
        body:"",
        published:"",
        author:"",
        category:""
    })
   
    useEffect(() => {
       axios.get("http://localhost:8080/api/books/" + id) 
        .then(res => {
            for(var i = 0; i < res.data.data.tags.length; i++) {
                axios.get("http://localhost:8080/api/tags/" + res.data.data.tags[i])
                .then(res => {
                    tags.push(res.data.data.name)
                })
                .catch(err => console.log(err))
            }

            setTitle(res.data.data.title) 
            setSubtitle(res.data.data.subtitle)
            setDesc(res.data.data.body)
            setDate(res.data.data.published) 
            setAuthor(res.data.data.author)
            setCategory(res.data.data.category)
            setImg(res.data.data.imgstr)

            setBook({
                id:id,
                title:res.data.data.title,
                subtitle:res.data.data.subtitle,
                body:res.data.data.body,
                published:res.data.data.published,
                author:res.data.data.author,
                category:res.data.data.category
            })
        })
        .catch(err => console.log(err))
    }, [])
        
    const editBook = () => {
        setShowResults(true)
    }

    const saveBook = () => {
        console.log(book)
        axios.patch("http://localhost:8080/api/books/" + id, book)
        .then(res=> {
            console.log(res)
        })
        .catch(err=>console.log(err))   

        setTitle(book.title)
        setSubtitle(book.subtitle)
        setDesc(book.body)
        setDate(book.published) 
        setAuthor(book.author)
        setCategory(book.category)

        setShowResults(false);
    }

    const cancelBook = () => {
        setShowResults(false)
    }

    const handleChange = e => {
        const {title,textContent} = e.currentTarget
        setBook({
            ...book,
            [title]:textContent
        })
    }
    
    return (
    <main className='Book-Wrapper'>
        <div className='Book-Header'>
            <div className='Book-Thumbnail'>
                <img src={img} height='256px' alt="thumbnail"></img>
            </div>
            <div className='Book-Text'>
                <h1 className='Book-Title'>{showResults ?  <ContentEditable title="title" onChange={handleChange} onBlur={handleChange} html={book.title} /> : title} </h1>
                <h2 className='Book-Sub-Title'>{showResults ? <ContentEditable title="subtitle" onChange={handleChange} onBlur={handleChange} html={book.subtitle} /> : subtitle}</h2>
                <span className='Book-Desc'>{showResults ?  <ContentEditable title="body" onChange={handleChange} onBlur={handleChange} html={book.body} /> : desc}</span>
            </div>
        </div>
        <br/>
        { 
            <div className='Book-Meta'>
                <span className='Book-Date'><b>Published: </b>{showResults ?  <ContentEditable title="published" onChange={handleChange} onBlur={handleChange} html={book.published} /> : date}</span> 
                <span className='Book-Author'><b>Author: </b>{showResults ?  <ContentEditable title="author" onChange={handleChange} onBlur={handleChange} html={book.author} /> : author}</span>
                <span className='Book-Category'><b>Category: </b>{showResults ? <ContentEditable title="category" onChange={handleChange} onBlur={handleChange} html={book.category} /> : category}</span>
                <p className='Book-Id'><b>ISBN: </b>{id}</p>
                <div className='Tags-Wrapper'>
                    {tags.map((tag) => <Tag key={tag} content={tag} />)}
                </div>
            </div>
        }   
        { !showResults && (
            <button type='button' id="edit-book" onClick={editBook}>Edit</button>
        )}
        { showResults ? (
            <div>
                <button type='button' id="edit-book" onClick={cancelBook}>Avbryt</button>
                <button type='button' id="edit-book" onClick={saveBook}>Spara</button>
            </div>
        ) : null }
    </main>); 
}

export default Book;