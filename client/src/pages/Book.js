import './css/Book.css'

import Tag from '../components/Tag'

import {
    useParams, useNavigate
} from "react-router-dom";

import React, {useEffect, useState} from 'react'
import axios from 'axios';


function Book(props) {
    let { id } = useParams();

    const [book, setBook] = useState({});
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState(undefined);

    let navigate = useNavigate();
    const routeToIndex = () =>{
        navigate('/');
    }

    function removeBook(){
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


    function removeFunc(){
        removeBook();
        routeToIndex();
    }


    useEffect(() => {
        axios.get("http://localhost:8080/api/books/" + id)
        .then(res => {
            setBook(res.data.data)
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
                <h1 className='Book-Title'>{book.title} [{book.borrower}]</h1>
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
                {book.tags && book.tags.map((tag) => <Tag key={tag} content={tag} isbn={book._id} show_rm={true}/>)}
            </div>
        </div>
       
        <div className ='Remove-Book'>
            <button type='button' id="isbn-remove" onClick={removeFunc}>Ta bort bok</button>
        </div>

        {/* TODO: Only show if book isn't borrowed?*/}
        <div className ='Borrow-Book'>
            <input type='text' id="borrow" placeholder="Namn" onInput={e => setUser(e.target.value)}/>
            <button type='button' id="borrow-submit" onClick={borrowBook}>Låna bok</button>
        </div>
        
        {/* TODO: Only let user who borrowed book se this*/}
        <div className='Return-Book'>
            <input type='text' id='borrow' placeholder="Namn" onInput={e => setUser(e.target.value)}/>
            <button type='button' id='return-submit' onClick={returnBook}>Lämna bok</button>
        </div>
    
        

    </main>);
}

export default Book;