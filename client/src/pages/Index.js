import BookPreview from "../components/BookPreview";
import Tag from "../components/Tag";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Index(props) {
    const [books, setBooks] = useState(undefined);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const searchText = props.searchText ? props.searchText.toLowerCase() : "";
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + "/api/books/")
            .then((res) => {
                setBooks(randomizeBooks(res.data.data));
                // console.log(res.data.data)
            })
            .catch((error) => console.error(error));
        // eslint-disable-next-line
    }, []);

    function randomizeBooks(books) {
        return books
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    function splitTags(input) {
        let tags = input.split("#");
        // Remove any empty tags resulting from consecutive "#" characters
        tags = tags.filter((tag) => tag !== "");
        return tags;
    }

    function extraTags(books, usedTags) {
        const allTags = books.map((book) => {
            return book.tags;
        });
        const flat = allTags.flat(1);
        const filtered = usedTags.length
            ? flat.filter((tag) => !usedTags.includes(tag))
            : flat;
        const unique = [...new Set(filtered)];
        return unique;
    }

    useEffect(() => {
        if (books) {
            if (searchText.startsWith("#")) {
                const tags = splitTags(searchText);
                setFilteredBooks(
                    // Filter the books that include all of the tags
                    // This filter function is by the help of chatGPT
                    books.filter((book) => {
                        return tags.every((tag) => {
                            return (
                                book.tags &&
                                book.tags
                                    .map((tag) => tag.toLowerCase())
                                    .includes(tag)
                            );
                        });
                    })
                );
            } else {
                setFilteredBooks(
                    books.filter(
                        (book) =>
                            book._id.includes(searchText) ||
                            book.title.toLowerCase().includes(searchText) ||
                            (book.subtitle &&
                                book.subtitle
                                    .toLowerCase()
                                    .includes(searchText)) ||
                            (book.tags &&
                                book.tags.some((tag) =>
                                    tag.toLowerCase().includes(searchText)
                                )) ||
                            (book.body &&
                                book.body.toLowerCase().includes(searchText)) ||
                            (book.author &&
                                book.author
                                    .toLowerCase()
                                    .includes(searchText)) ||
                            (book.category &&
                                book.category
                                    .toLowerCase()
                                    .includes(searchText))
                    )
                );
            }
        }
    }, [books, searchText]);

    return (
        <main className="App-content">
            {searchText.startsWith("#") && (
                <div id="extraTags">
                    <p>Andra taggar:&nbsp;</p>
                    {extraTags(filteredBooks, splitTags(searchText)).map(
                        (tag) => (
                            <Tag
                                key={tag}
                                name={tag}
                                updateSearch={props.updateSearch}
                            />
                        )
                    )}
                </div>
            )}
            {filteredBooks &&
                filteredBooks.map((book) => (
                    <span key={book._id}>
                        <BookPreview
                            id={book._id}
                            title={book.title}
                            body={book.body}
                            author={book.author}
                            shelf={book.shelf}
                            category={book.category}
                            language={book.language}
                            publisher={book.publisher}
                            borrower={book.borrower}
                            borrowed={book.borrowed}
                            date={book.published}
                            img={book.imgstr}
                            taglist={book.tags}
                            updateSearch={props.updateSearch}
                        />
                    </span>
                ))}
        </main>
    );
}

export default Index;
