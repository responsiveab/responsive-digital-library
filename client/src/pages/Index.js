import BookPreview from "../components/BookPreview"
import axios from 'axios';
import React, {useEffect, useState} from 'react'

function Index(props) {
  const [books, setBooks] = useState(undefined)
  const [filteredBooks, setFilteredBooks] = useState([]);
  const input = props.input.toLowerCase();
  useEffect(() => {
    axios.get("http://localhost:8080/api/books/")
      .then(res => {
        setBooks(res.data.data)
        // console.log(res.data.data)
      })
      .catch(error => console.error(error));
      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (books) {
      setFilteredBooks(books.filter(book => 
        book.title.toLowerCase().includes(input) || 
        (book.tags && book.tags.some(tag => tag.toLowerCase().includes(input))) ||
        (book.body && book.body.toLowerCase().includes(input)) || 
        (book.author && book.author.toLowerCase().includes(input)) ||
        (book.category && book.category.toLowerCase().includes(input))
      ));
    }
  }, [books, props.input]);
  

    return (
    <main className="App-content">
          {
            filteredBooks ? filteredBooks.map((book) => <span key={book._id}><BookPreview id={book._id} 
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