import './css/Book.css'

import Tag from '../components/Tag'

import {
    useParams, useNavigate
} from "react-router-dom";

import React, {useEffect, useState} from 'react'
import axios, * as others from 'axios'
import ContentEditable from 'react-contenteditable'
// import { API_URL } from '../utils/constants';

function Book(props) {
    let { id } = useParams();

    const [showResults, setShowResults] = useState(undefined);
    const [book, setBook] = useState({});
    const [user, setUser] = useState(undefined);
 
    const [bookMod, setBookMod] = useState({
        id:id,
        title:"",
        subtitle:"",
        body:"",
        published:"",
        author:"",
        category:"",
        filename:""
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


    const editBook = () => {
        setShowResults(true)
    }

    const saveBook = () => {
        console.log(bookMod)
        axios.patch("http://localhost:8080/api/books/" + id, bookMod)
        .then(res=> {
            console.log(res)
        })
        .catch(err=>console.log(err))   
        setBook(bookMod)
        setShowResults(false);
    }

    const cancelBook = () => {
        setShowResults(false)
    }

    // TODO: Async, wait until file is uploaded to volume before editing
    function uploadBook(e) {
        handleOnSubmit(e);
        // e.preventDefault();

        // const fileContent = e.target.files[0];
        // let blobPDF = new Blob([e.target.files], {type: "pdf"});
        // let formData = new FormData ();
        // formData.append(fileContent.name, blobPDF);
        // bookMod.filename = fileContent.name;
        // // setBookMod({
        // //     ...bookMod,
        // //     ["filename"]:fileContent.name
        // // })
        // saveBook();
        // alert("File submitted")
    }

    const downloadBook = () => {

    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        try {
          //const { title, description } = event.target.value;
          const description = event.target.files[0].name;
          const title = event.target.files[0].name;
          //if (title.trim() !== '' && description.trim() !== '') {
            if (file) {
              console.log(file)
              const formData = new FormData();
              formData.append('file', file); // lagra i databasen
              formData.append('title', title); // skicka till book model
              formData.append('description', description);
      
            //   setErrorMsg('');
              await axios.post(`http://localhost:8080/api/files/upload`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            } else {
                alert('Please select a file to add.');
            }
            const filename = "filename";
            setBookMod({
                ...bookMod,
                [filename]:title
            })
            saveBook();
            alert("Filen är uppladdad.")
        } 
        catch (error) {
            console.log(error); //   error.response && setErrorMsg(error.response.data);
        }
      };
      

    const handleChange = e => {
        const {title,textContent} = e.currentTarget
        setBookMod({
            ...bookMod,
            [title]:textContent
        })
    }
    
    return (
    <main className='Book-Wrapper'>
        <div className='Book-Header'>
            <div className='Book-Thumbnail'>
                <img src={book.imgstr} height='256px' alt="thumbnail"></img>
            </div>
            <div className='Book-Text'>
                <h1 className='Book-Title'>{showResults ?  <ContentEditable title="title" onChange={handleChange} onBlur={handleChange} html={bookMod.title} /> : book.title} [{book.borrower}]</h1>
                <h2 className='Book-Sub-Title'>{showResults ? <ContentEditable title="subtitle" onChange={handleChange} onBlur={handleChange} html={bookMod.subtitle} /> : book.subtitle}</h2>
                <span className='Book-Desc'>{showResults ?  <ContentEditable title="body" onChange={handleChange} onBlur={handleChange} html={bookMod.body} /> : book.body}</span>
            </div>
        </div>
        <br/>
        { 
            <div className='Book-Meta'>
                <span className='Book-Date'><b>Published: </b>{showResults ?  <ContentEditable title="published" onChange={handleChange} onBlur={handleChange} html={bookMod.published} /> : book.date}</span> 
                <span className='Book-Author'><b>Author: </b>{showResults ?  <ContentEditable title="author" onChange={handleChange} onBlur={handleChange} html={bookMod.author} /> : book.author}</span>
                <span className='Book-Category'><b>Category: </b>{showResults ? <ContentEditable title="category" onChange={handleChange} onBlur={handleChange} html={bookMod.category} /> : book.category}</span>
                <p className='Book-Id'><b>ISBN: </b>{book.id}</p>
                <div className='Tags-Wrapper'>
                    {book.tags && book.tags.map((tag) => <Tag key={tag} content={tag} isbn={book._id} show_rm={true}/>)}
                </div>
            </div>
        }  

        <div className ='Upload-Book'>
            <input type="file" onChange={handleOnSubmit}/>
        </div>

        <div className ='Remove-Book'>
            <button type='button' id="upload book" onClick={downloadBook}>Ladda ned bok</button>
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