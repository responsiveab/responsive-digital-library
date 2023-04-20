import HeaderWithoutSearch from '../components/headers/HeaderWithoutSearch';
import './css/Account.css'
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import BookPreview from "../components/BookPreview"


function Account(props) {
    const [books, setBooks] = useState()
    useEffect(() => {
        axios.get("http://localhost:8080/api/books/")
          .then(res => {
            setBooks(res.data.data)
            console.log(res.data.data)
          })
          .catch(error => console.error(error));
          // eslint-disable-next-line
      }, []);

    return (
    <>
        <HeaderWithoutSearch/>
        {
        props.user && 
        <>
            {
                <main className="Account-Wrapper">
                    <div className="container">
                        <div className="flex-container">
                            <div className="left-column">
                                <div className="information">
                                    <div className='Photo'>

                                    </div>
                                    <div className='User'>
                                        <h1>{props.user.name}</h1>
                                        <h1>{props.user.email}</h1>
                                    </div>
                                    
                               </div>
                                <div className="reading-list">
                                    <h1>Läslista</h1>
                                    {books ? books.map((book) => <span key={book._id}>
                                                            <BookPreview id={book._id} 
                                                                          title={book.title} 
                                                                          author={book.author}
                                                                          body={book.body}
                                                                          img={book.imgstr}
                                                                          taglis={book.tags}/>
                                                            </span>): <></>
                                    }
                                    
                                </div>
                            </div>
                            <div className="loan-list">
                                <h1>Mina Lån</h1>
                                     {books ? books.map((book) => <span key={book._id}>
                                                            <BookPreview id={book._id} 
                                                                          img={book.imgstr}
                                                                          
                                                                          />
                                                            </span>): <></>
                                    }
                            </div>
                        </div>
                    </div>
                </main>


             
               
            /* 
            TODO:
            <h2>Lånade böcker</h2>
            <h2>Favoritma <div class="information">
                <h1>Profilsida för {props.user.name}</h1>
             </div>   rkerade böcker</h2>
            <h2>Inställningar</h2>
            */
            }
        </>
        }
    </>);
}

export default Account;