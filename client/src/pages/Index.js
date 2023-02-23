import BookPreview from "../components/BookPreview"
import axios, * as others from 'axios';
import React, {useEffect, useState} from 'react'

function Index() {
  const [books, setBooks] = useState(undefined)


  useEffect(() => {
    axios.get("http://localhost:8080/api/books/")
    .then(res => setBooks(res.data.data))
    .then(console.log(books))
  // eslint-disable-next-line
  }, [])

    return (
    <main className="App-content">
        <h1>Welcome to Responsive Digital Library</h1>
        <p>
          Here you will be able to keep track of your books.
        </p>
        <div>
          {
            books ? books.map((book) => <span key={book._id}><BookPreview id={book._id} title={book.title} body={book.body} author={book.author}/></span>) : <></>
          }
        </div>
    </main>);
}

export default Index;