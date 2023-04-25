import './css/Book.css'

import Tag from '../components/Tag'

import {
    useParams, useNavigate
} from "react-router-dom";

import React, {useEffect, useState} from 'react'
import axios, * as others from 'axios';
import HeaderWithoutSearch from '../components/headers/HeaderWithoutSearch';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

function Book(props) {
    let {id} = useParams();

    const [book, setBook] = useState({});
    const [user, setUser] = useState(undefined);
    const [editBookInfo, setEditBookInfo] = useState(false);
    
    const [bookMod, setBookMod] = useState({
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
            setBook(res.data.data)
            setBookMod(res.data.data) // copy for modification
        })
        .catch(err => console.log(err))
    }, [])

    let navigate = useNavigate();
    const routeToIndex = () =>{
        navigate('/');
    }

    function removeBook(){
        axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
        axios.delete("http://localhost:8080/api/books/" + id)
        .then(res =>{
            console.log(res)
            if(!res.data.data){
                console.log("ingen resdata");
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    function borrowBook(){
        // TODO: Add authentication, waiting for logged in user implementation
        let borrow = {
            borrower:user,
            borrowed:true
        }
        axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
        axios.patch("http://localhost:8080/api/books/" + id, borrow)        
        .then(res =>{
            console.log(res)
            if(!res.data.data){
                console.log("fel?");
            }
        })
        .catch(err => {
            console.log(err);
        })
       console.log(user)    
    }

    function returnBook(){
        // TODO: Add authentication, waiting for logged in user implementation
        let returner = {
            borrower:'',
            borrowed:false
        }
       
        axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
        axios.patch("http://localhost:8080/api/books/" + id, returner)        
        .then(res =>{
            console.log(res)
            if(!res.data.data){
                console.log("fel?");
            }
        })
        .catch(err => {
            console.log(err);
        })
       console.log(user)
    }

    async function getUser(account_id) {
        axios.defaults.headers.common['x-access-token'] = window.localStorage.getItem('token')
        try {
            const response = await axios.get("http://localhost:8080/api/users/" + account_id)
            console.log('res', response.data);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    async function addToReadList(){
        let account = props.user
        let account_id = account._id
        let add_to_readlist = {
            book: {
                _id: id
            }
        }
        try{
            let user_ = await getUser(account_id)
            if (user_.data.reading_list_books.includes(id)){
                console.log("Boken finns redan")
            }
            else{
                axios.defaults.headers.common['x-access-token'] = window.localStorage.getItem('token')
                axios.patch("http://localhost:8080/api/users/" + account_id, add_to_readlist)
                .then(res =>{
                    if(!res.data){
                        console.log(res);
                    }
                    console.log("Boken tillagd")
                    console.log(res)
                })
                .catch(err => {
                    console.log(err);
                })
            }

        }catch(err){
            console.log(err)
        } 
    }

    async function removeFromReadList(){
        let account = props.user;
        let account_id = account._id;
        let remove_from_readlist = {
            book: {
                _id: id
            }
        };
        try{
            let user_ = await getUser(account_id);
            if (!user_.data.reading_list_books.includes(id)){
                console.log("Boken ligger inte i läslistan")
            }
            else{
                axios.defaults.headers.common['x-access-token'] = window.localStorage.getItem('token');
                axios.patch(
                    "http://localhost:8080/api/users/" +
                      account_id +
                      "/reading-list-books/" +
                      id,
                    remove_from_readlist
                  )
                .then(res =>{
                    console.log("Response:", res);
                    if(!res.data){
                        console.log("Error:", res);
                    }
                    console.log("Boken borttagen");
                    console.log("Data:", res.data);
                })
                .catch(err => {
                    console.log("Error:", err);
                });
            }
    
        }catch(err){
            console.log("Error:", err);
        }
    }

    function removeFunc(){
        removeBook();
        routeToIndex();
    }
        
    const editBook = () => {
        setEditBookInfo(true)
    }

    const cancelBook = () => {
        setBookMod(book)
        setEditBookInfo(false)
    }

    const handleSave = ({ name, value}) => {
        setBookMod({
            ...bookMod,
            [name]:value
        })
    };

    const saveBook = () => {
        axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
        axios.patch("http://localhost:8080/api/books/" + id, bookMod)
        .then(res=> {
            console.log(res)
        })
        .catch(err=>console.log(err))   
        setBook(bookMod)
        setEditBookInfo(false)
    }

    return (
    <>
        <HeaderWithoutSearch user={props.user}/>
        {
            <main className='Book-Wrapper'>
                <div className='Book-Header'>
                    {book.imgstr !== "Bild saknas" && (
                    <div className='Book-Thumbnail'>
                        <img src={book.imgstr} width='128px' alt="thumbnail"></img>
                    </div>
                    )}
                    <div className='Book-Text'>
                        <EditText id="book-title" name="title" defaultValue={bookMod.title} onSave={handleSave} inline readonly={!editBookInfo} placeholder={"Titel"}/>
                        <br></br>
                        <EditText id="book-author" name='author' defaultValue={bookMod.author} inline onSave={handleSave}readonly={!editBookInfo}  placeholder={"Författare"}/>
                        <br></br>
                        <EditText id="book-date" name='published' defaultValue={bookMod.published} inline onSave={handleSave} readonly={!editBookInfo} placeholder={"Publiceringsdatum"}/>
                        <br></br>
                        <EditText id="book-category" name='category' defaultValue={bookMod.category} inline onSave={handleSave} readonly={!editBookInfo} placeholder={"Kategori"}/>
                        <br></br>
                        <EditText id="book-publisher" name='publisher' defaultValue={bookMod.publisher} inline onSave={handleSave} readonly={!editBookInfo} placeholder={"Förlag"}/>
                        <br></br>
                        <EditTextarea id="book-body" name='body' defaultValue={bookMod.body} rows={'auto'} inline onSave={handleSave} readonly={!editBookInfo} placeholder={"Beskrivning"}/>
                        <EditText id="book-id" defaultValue={bookMod._id} inline readonly={true} placeholder={"ISBN"}/>
                        <div className='Tags-Wrapper'>
                            {book.tags && book.tags.map((tag) => <Tag key={tag} content={tag} isbn={book._id} show_rm={true}/>)}
                        </div>
                    </div>
                </div>

                <div className ='Book-buttons'>
                    {/* TODO: Only show if book isn't borrowed?*/}
                    <div className ='Borrow-Book'>
                        <button type='button' id="borrow-submit" onClick={borrowBook}>Låna bok</button>
                    </div>

                    <div className ='ReadList-Book'>
                        <button type ='button' id = "readlist-submit" onClick={addToReadList}>Lägg till i läslista</button>
                    </div>
                    <div className ='Remove-ReadList-Book'>
                        <button type ='button' id = "readlist-remove" onClick={removeFromReadList}>Ta bort från läslista</button>
                    </div>


                    {/* TODO: Only let user who borrowed book se this*/}
                    {/*
                    <div className='Return-Book'>
                        <button type='button' id='return-submit' onClick={returnBook}>Lämna bok</button>
                    </div>*/}
                    <div className ='Remove-Book'>
                        <button type='button' id="isbn-remove" onClick={removeFunc}>Ta bort bok</button>
                    </div>
                    
                    {!editBookInfo && (
                        <button type='button' id="edit-book" onClick={editBook}>Ändra metadata</button>
                    )}
                    {editBookInfo ? (
                        <div className='Align-h'>
                            <button type='button' id="edit-book" onClick={saveBook}>Spara</button>
                            <button type='button' id="edit-book" onClick={cancelBook}>Avbryt</button>
                        </div>
                    ) : null}
                </div>
            </main>
        }
    </>
        ); 
}

export default Book;