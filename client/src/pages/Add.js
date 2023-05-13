import React, {useState, useEffect} from 'react'
import axios from 'axios';

import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import {BiPlusCircle} from "react-icons/bi";

import Tag from '../components/Tag'
import cover_missing_img from "../media/cover_missing_img.png";

import './css/Add.css'
import {
    useNavigate
} from "react-router-dom";
import HeaderWithoutSearch from '../components/headers/HeaderWithoutSearch';

function Add(props) {
    const [book, setBook] = useState(undefined)

    const [isbnNr, setIsbnNr] = useState(undefined);
    const [tag, setTag] = useState(undefined);

    const [tags, setTags] = useState([]);

    const [dbTags, setDbTags] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/tags")
        .then(res => {
            setDbTags(res.data.data)
            console.log(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    function fetchBook() {
        var isbn = require('node-isbn');
        isbn.resolve(isbnNr, function (err, fetched_book) {
            if (err) {
                console.log('Book not found. Add the book manually.', err);
                let newBook = {
                    id: isbnNr,
                    title: "Skriv produktens titel",
                    body: "Skriv beskrivning av produkten",
                    author: "Skriv författare av produkten",
                    category: "Skriv kategori av produkten",
                    img: cover_missing_img,
                    language: "Skriv produktens språk",
                    publisher: "Skriv produktens förlag",
                    date: "Skriv produktens utgivningsdatum",
                    borrower: "ingen",
                    borrowed: false
                  };
                setBook(newBook);
                alert(`Boken med ISBN-nummer: ${newBook.id} hittades inte i databasen, vär vänlig och fyll i uppgifterna manuellt.`)
            } else {
                let newBook = {
                    id:isbnNr,
                    title:(fetched_book.title ? fetched_book.title : "Titel saknas"),
                    body:(fetched_book.description ? fetched_book.description : "Beskrivning saknas"),
                    author:(fetched_book.authors ? fetched_book.authors[0] : "Okänd författare"), 
                    category:(fetched_book.categories ? fetched_book.categories[0] : "Okategoriserad"),
                    img:(fetched_book.imageLinks ? fetched_book.imageLinks.thumbnail : cover_missing_img),
                    language:(fetched_book.language ? fetched_book.language : "Okänt språk"),
                    publisher:(fetched_book.publisher ? fetched_book.publisher : "Okänt förlag"),
                    date:(fetched_book.publishedDate ? fetched_book.publishedDate : "Okänt publiceringsdatum"),
                    borrower:"ingen",
                    borrowed:false
                }
                setBook(newBook);
            }
            // Hide input field
            document.getElementById('isbn-input').style.display = 'none';
        })
    }

    const addBook = () => {
        axios.get(process.env.REACT_APP_API_URL + "/api/books/" + isbnNr)
        .then(res => {
            if(!res.data.data) {
                if (book) {
                    axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
                    axios.post(process.env.REACT_APP_API_URL + "/api/books/", book)
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

    const check_tag_exists = (t) => {
        for(let i = 0; i < dbTags.length; i++) {
            if(dbTags[i]._id == t) {
                return true
            }
        }
        return false
    }

    const addTag = (t) => {
        let newTag = {
            name: t
        }

        if(check_tag_exists(t)) {
            let modifiedFields = {
                tag: { _id: t }
            }
            axios.patch(process.env.REACT_APP_API_URL + "/api/tags/" + isbnNr, modifiedFields)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        }
        else {
            axios.post(process.env.REACT_APP_API_URL + "/api/tags/", newTag)
            .then(res=> {
                console.log(res.data.data)
                let modifiedFields = {
                    tag: res.data.data
                }
                console.log(modifiedFields)
                axios.patch(process.env.REACT_APP_API_URL + "/api/tags/" + isbnNr, modifiedFields)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err=>console.log(err))
        }
    }

    const handleSave = ({ name, value, previousValue }) => {
        setBook({
            ...book,
            [name]:value
        })
    };

    const handleAddBookSubmit = (event) => {
        // PreventDefault makes the page not reload when Enter key is pressed.
        event.preventDefault();
        fetchBook();
    };

    return (
    <>
        <HeaderWithoutSearch user={props.user}/>
        <form action='#' className='add-book-form' onSubmit={handleAddBookSubmit}>
            <input type="text" id="isbn-input" name="isbn" placeholder='ISBN' onInput={e => setIsbnNr(e.target.value)}/>
            {
                isbnNr && (isbnNr.length > 8) &&
                (book ? <div className='outline'>
                        { (book.img !== "Bild saknas") ? <div className="CoverImage-Wrapper">
                        {
                            <img src={book.img} width="128px" alt="cover"></img>
                        }
                        </div> : 
                        <div className="CoverImage-Wrapper">
                        {
                            <img src={cover_missing_img} width="128px" alt="cover"></img>
                        }
                        </div>
                        }
                        <div className='edit-text-div'>
                            <EditText id="book-title" name="title" defaultValue={book.title} inline onSave={handleSave} placeholder={"Titel"}/>
                            <br></br>
                            <EditText id="book-author" name='author' defaultValue={book.author} inline onSave={handleSave} placeholder={"Författare"}/>
                            <br></br>
                            <EditText id="book-date" name='date' defaultValue={book.date} inline onSave={handleSave} placeholder={"Publiceringsdatum"}/>
                            <br></br>
                            <EditText id="book-category" name='category' defaultValue={book.category} inline onSave={handleSave} placeholder={"Kategori"}/>
                            <br></br>
                            <EditText id="book-publisher" name='publisher' defaultValue={book.publisher} inline onSave={handleSave} placeholder={"Förlag"}/>
                            <br></br>
                            <EditTextarea id="book-body" name='body' defaultValue={book.body} rows={'auto'} inline onSave={handleSave} placeholder={"Beskrivning"}/>
                        </div>
                       
                        <p><b>{book.id}</b></p>
                        {
                            tags ? <div>{tags.map((t) => <Tag key={t} content={t} />)}</div> : <></>
                        }
                        <input type="text" id="tag-input" name="tag" placeholder="tagg" onInput={e => setTag(e.target.value)}/>
                        <button type='button' id="tag-submit" onClick={appendTag}><BiPlusCircle/></button>
                    <button type='button' id="isbn-submit" onClick={addBook}>Lägg till bok</button>
                    <button type='button' id="isbn-cancel" onClick={cancelBook}>Avbryt</button>

                </div> : <button type='button' id="isbn-submit" onClick={handleAddBookSubmit}>Hämta bok</button>)
            }
        </form>
    </>);
}

export default Add;