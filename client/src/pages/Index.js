import BookPreview from "../components/BookPreview"
import axios from 'axios';
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
          {
            books ? books.map((book) => <span key={book._id}><BookPreview id={book._id} title={book.title} body={book.body} author={book.author}/></span>) : <></>
          }
    </main>);
}

export default Index;