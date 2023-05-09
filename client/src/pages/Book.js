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

    const [showResults, setShowResults] = useState(undefined);
    const [showReadList, setShowReadList] = useState(undefined);
    const [book, setBook] = useState({});
    const [user, setUser] = useState(undefined);
    const [editBookInfo, setEditBookInfo] = useState(false);
    
    const [bookMod, setBookMod] = useState({
        id:id,
        title:"",
        subtitle:"", // ANVÄNDS INTE?
        body:"",
        published:"",
        author:"",
        category:""
    })

    useEffect(() => {
        axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
        
        async function fetchData() {
            const account_id = props.user._id;
            const user_ = await getUser(account_id)
            setUser(user_.data)
        }

        fetchData();
    }, []);
    
    useEffect(() => {
        if (user !== undefined){
            if (user.reading_list_books.includes(id)){
                setShowReadList(false);
            }
            else{
                setShowReadList(true);
            }
        }
      }, [user]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/books/" + id)
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
    
    async function getUser(account_id) {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/api/users/" + account_id)
            console.log('res', response.data);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    function removeBook(){
        axios.delete(process.env.REACT_APP_API_URL + "/api/books/" + id)
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

    async function addBorrowerToBook(account_name){
        let add_to_borrower = {
            borrower: account_name,
            borrowed: true
        }
        axios.patch(process.env.REACT_APP_API_URL + "/api/books/" + id, add_to_borrower)
        .then(res =>{
            if(!res.data){
                console.log(res);
            }
            console.log(account_name + "added to borrower")
            console.log(res)
            setBook(res.data.data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    function removeBorrowerFromBook(){
        let remove_from_borrower = {
            borrower: "ingen",
            borrowed: false
        }
        axios.patch(process.env.REACT_APP_API_URL + "/api/books/" + id, remove_from_borrower)
        .then(res =>{
            if(!res.data){
                console.log(res);
            }
            console.log("removed borrower")
            console.log(res)
            setBook(res.data.data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    async function borrowBook(){
        let add_to_loanlist = {
            book: {
                _id: id
            }
        }
        console.log(add_to_loanlist.book._id)
        console.log(user._id)
        if (user.loan_list_books.includes(id)){
            console.log("Boken finns redan i lånlistan")
        }
        else{
            
            axios.patch(process.env.REACT_APP_API_URL + "/api/users/" + user._id + "/loan-list-books", add_to_loanlist)
            .then(res =>{
                if(!res.data){
                    console.log(res);
                }
                console.log("Boken tillagd i lånlistan")
                setUser(res.data.data)
                addBorrowerToBook(user.name)
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            })
        }
        
    }

    async function returnBook(){
        let remove_from_loanlist = {
            book: {
                _id: id
            }
        };
        if (!user.loan_list_books.includes(id)){
            console.log("Boken ligger inte i lånlistan")
        }
        else{
            axios.patch(process.env.REACT_APP_API_URL + "/api/users/" +user._id +"/loan-list-books/" + id, remove_from_loanlist)
            .then(res =>{
                console.log("Response:", res);
                if(!res.data){
                    console.log("Error:", res);
                }
                console.log("Boken borttagen från lånlistan");
                console.log("Data:", res.data);
                setUser(res.data.data)
                removeBorrowerFromBook()
            })
            .catch(err => {
                console.log("Error:", err);
            });
        }
    }

    async function addToReadList(){
        let add_to_readlist = {
            book: {
                _id: id
            }
        }

        if (user.reading_list_books.includes(id)){
            console.log("Boken finns redan i läslistan")
        }
        else{
            axios.patch(process.env.REACT_APP_API_URL + "/api/users/" + user._id, add_to_readlist)
            .then(res =>{
                if(!res.data){
                    console.log(res);
                }
                console.log("Boken tillagd")
                console.log(res)
                setUser(res.data.data)
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    async function removeFromReadList(){
        let remove_from_readlist = {
            book: {
                _id: id
            }
        };
        if (!user.reading_list_books.includes(id)){
            console.log("Boken ligger inte i läslistan")
        }
        else{
            axios.patch(process.env.REACT_APP_API_URL + "/api/users/" + user._id +"/reading-list-books/" + id, remove_from_readlist)
            .then(res =>{
                console.log("Response:", res);
                if(!res.data){
                    console.log("Error:", res);
                }
                console.log("Boken borttagen");
                setUser(res.data.data)
            })
            .catch(err => {
                console.log("Error:", err);
            });
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
        console.log(bookMod)
        axios.patch(process.env.REACT_APP_API_URL + "/api/books/" + id, bookMod)
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
                        {/* TODO: Fix styling for longer book titles */}
                        <EditText id="Book-Title" name="title" defaultValue={bookMod.title} onSave={handleSave} inline readonly={!editBookInfo} placeholder={"Titel"}/>
                        <EditText id="Book-Title" name="borrower" defaultValue={<>[{book.borrower}]</>} onSave={handleSave} inline readonly={true} placeholder={"Lånad av"}/>
                        <br></br>
                        <EditText id="Book-Author" name='author' defaultValue={bookMod.author} inline onSave={handleSave}readonly={!editBookInfo}  placeholder={"Författare"}/>
                        <br></br>
                        <EditText id="Book-Date" name='published' defaultValue={bookMod.published} inline onSave={handleSave} readonly={!editBookInfo} placeholder={"Publiceringsdatum"}/>
                        <br></br>
                        <EditText id="Book-Category" name='category' defaultValue={bookMod.category} inline onSave={handleSave} readonly={!editBookInfo} placeholder={"Kategori"}/>
                        <br></br>
                        <EditText id="Book-Publisher" name='publisher' defaultValue={bookMod.publisher} inline onSave={handleSave} readonly={!editBookInfo} placeholder={"Förlag"}/>
                        <br></br>
                        <EditTextarea id="Book-Body" name='body' defaultValue={bookMod.body} rows={'auto'} inline onSave={handleSave} readonly={!editBookInfo} placeholder={"Beskrivning"}/>
                        <EditText id="book-id" defaultValue={bookMod._id} inline readonly={true} placeholder={"ISBN"}/>
                        <div className='Tags-Wrapper'>
                            {book.tags && book.tags.map((tag) => <Tag key={tag} content={tag} isbn={book._id} show_rm={true}/>)}
                        </div>
                    </div>
                </div>

                <div className ='Book-buttons'>
                    { !book.borrowed ? (
                        <div className ='Borrow-Book'>
                            <button type='button' id="borrow-submit" onClick={borrowBook}>Låna bok</button>
                        </div>
                    ) : (
                        book.borrower === props.user.name && (
                            <div className='Return-Book'>
                                <button type='button' id='return-submit' onClick={returnBook}>Lämna bok</button>
                            </div>
                        )
                             
                    )}

                    { showReadList ? (
                        <div className ='ReadList-Book'>
                            <button type ='button' id = "readlist-submit" onClick={addToReadList}>Lägg till i läslista</button>
                        </div>
                    ) : (
                    
                        <div className ='Remove-ReadList-Book'>
                            <button type ='button' id = "readlist-remove" onClick={removeFromReadList}>Ta bort från läslista</button>
                        </div>
                    )}
                    
                    <div className ='Remove-Book'>
                        <button type='button' id="isbn-remove" onClick={removeFunc}>Ta bort bok</button>
                    </div>

                   { !showResults && (
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