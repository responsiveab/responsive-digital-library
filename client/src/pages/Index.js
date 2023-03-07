import BookPreview from "../components/BookPreview"
import axios from 'axios';
import React, {useEffect, useState} from 'react'

function Index() {
  const [books, setBooks] = useState(undefined)

  useEffect(() => {
    axios.get("http://localhost:8080/api/books/")
    .then(res => {
      setBooks(res.data.data)
      console.log(res.data.data)
    })
    .catch(err => console.log(err))
  // eslint-disable-next-line
  }, [])

    return (
    <main className="App-content">
          {
            books ? books.map((book) => <span key={book._id}><BookPreview id={book._id} 
                                                                          title={book.title} 
                                                                          body={book.body} 
                                                                          author={book.author}
                                                                          shelf={book.shelf}
                                                                          category={book.category}
                                                                          language={book.language}
                                                                          publisher={book.publisher}
                                                                          date={book.published}
                                                                          img={book.imgstr}
                                                                          taglis={book.tags}/></span>) : <></>
          }
    </main>);
}

export default Index;