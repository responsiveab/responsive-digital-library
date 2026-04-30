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

    // Tokenize "#tag1 some text #tag2" into a tag-list and free-text-list.
    function parseSearch(input) {
        const tokens = (input || "")
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .filter(Boolean);
        const tags = [];
        const text = [];
        for (const token of tokens) {
            if (token.startsWith("#") && token.length > 1) {
                tags.push(token.slice(1));
            } else if (!token.startsWith("#")) {
                text.push(token);
            }
        }
        return { tags, text };
    }

    function matchesBook(book, { tags, text }) {
        const tagsLower = book.tags
            ? book.tags.map((t) => t.toLowerCase())
            : [];
        if (!tags.every((t) => tagsLower.includes(t))) return false;
        if (text.length === 0) return true;

        const haystack = [
            book._id,
            book.title,
            book.subtitle,
            book.author,
            book.category,
            book.body,
            ...(book.tags || []),
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return text.every((t) => haystack.includes(t));
    }

    function extraTags(books, usedTags) {
        const used = usedTags.map((t) => t.toLowerCase());
        const flat = books.flatMap((book) => book.tags || []);
        const filtered = used.length
            ? flat.filter((tag) => !used.includes(tag.toLowerCase()))
            : flat;
        return [...new Set(filtered)];
    }

    const parsedSearch = parseSearch(searchText);

    useEffect(() => {
        if (books) {
            setFilteredBooks(
                books.filter((book) => matchesBook(book, parsedSearch))
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [books, searchText]);

    return (
        <main className="App-content">
            {parsedSearch.tags.length > 0 && (
                <div id="extraTags">
                    <p>Andra taggar:&nbsp;</p>
                    {extraTags(filteredBooks, parsedSearch.tags).map((tag) => (
                        <Tag
                            key={tag}
                            name={tag}
                            updateSearch={props.updateSearch}
                        />
                    ))}
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
