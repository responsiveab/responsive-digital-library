import './css/Book.css'

import Tag from '../components/Tag'

import {
    useParams, useNavigate
} from "react-router-dom";

import React, {useEffect, useState} from 'react'
import axios, * as others from 'axios'
import ContentEditable from 'react-contenteditable'
// import { API_URL } from '../utils/constants';
import HeaderWithoutSearch from '../components/headers/HeaderWithoutSearch';

function Book(props) {
    let {id} = useParams();

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
        setShowResults(true)
    }

    const saveBook = () => {
        console.log(bookMod)
        axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
        axios.patch("http://localhost:8080/api/books/" + id, bookMod)
        .then(res=> {
            console.log(res)
        })
        .catch(err=>console.log(err))   
        setBook(bookMod)
        setShowResults(false);
    }

    const cancelBook = () => {
        // reset input fields
        setBookMod(book)

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
          const title = event.target.files[0].name;
          //if (title.trim() !== '' && description.trim() !== '') {
            if (file) {
              console.log(file)
              const formData = new FormData();
              formData.append('_id', id);
              formData.append('file', file); // lagra i databasen
              formData.append('title', title); // skicka till book model
      
            //   setErrorMsg('');
              await axios.post(`http://localhost:8080/api/files/upload`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            alert("Filen är uppladdad.")
            } else {
                alert('Please select a file to add.');
            }
            /*const filename = "filename";
            setBookMod({
                ...bookMod,
                [filename]:title
            })
            saveBook();*/
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
    <>
        <HeaderWithoutSearch user={props.user}/>
        {
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
                        <span className='Book-Date'><b>Published: </b>{showResults ?  <ContentEditable title="published" onChange={handleChange} onBlur={handleChange} html={bookMod.published} /> : book.published}</span>{!showResults ? <br></br> : <></>}
                        <span className='Book-Author'><b>Author: </b>{showResults ?  <ContentEditable title="author" onChange={handleChange} onBlur={handleChange} html={bookMod.author} /> : book.author}</span>{!showResults ? <br></br> : <></>}
                        <span className='Book-Category'><b>Category: </b>{showResults ? <ContentEditable title="category" onChange={handleChange} onBlur={handleChange} html={bookMod.category} /> : book.category}</span>{!showResults ? <br></br> : <></>}
                        <span className='Book-Id'><b>ISBN: </b>{book._id}</span>{!showResults ? <br></br> : <></>}
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

                    
                   { !showResults && (
                        <button type='button' id="edit-book" onClick={editBook}>Ändra metadata</button>
                    )}
                    { showResults ? (
                        <div className='Align-h'>
                            <button type='button' id="edit-book" onClick={saveBook}>Spara</button>
                            <button type='button' id="edit-book" onClick={cancelBook}>Avbryt</button>
                        </div>
                    ) : null }
                    
                 
                </div>
            </main>
        }
    </>
        ); 
}

export default Book;