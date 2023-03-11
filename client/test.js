book1 = {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien"
}
book2 = {
    "title": "The Shining",
    "author": "Stephen King"
}
const books = {
    "1": book1,
    "2": book2
}

function findBook(title) {
    matches = []
    for (let key in books) {
        if (books[key].title.includes(title)) {
            matches.push(books[key])
        }
    }
    return matches
}
const books1 = books;
for (let key in books1) {
    if (books1[key].title.includes("The")) {
        delete books1[key]
    }
}
delete books1["1"]
console.log(books1)

