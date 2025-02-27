import "./css/Book.css";

import Tag from "../components/Tag";

import { useParams, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderWithoutSearch from "../components/headers/HeaderWithoutSearch";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { Editor } from "@tinymce/tinymce-react";

function Book(props) {
    let { id } = useParams();

    // eslint-disable-next-line
    const [showResults, setShowResults] = useState(undefined);
    const [showReadList, setShowReadList] = useState(undefined);
    const [originalBook, setOriginalBook] = useState({});
    const [user, setUser] = useState(undefined);
    const [editBookInfo, setEditBookInfo] = useState(false);
    const [typedTag, setTypedTag] = useState(undefined);

    const [modifiedBook, setModifiedBook] = useState({
        id: id,
        title: "",
        subtitle: "",
        body: "",
        published: "",
        author: "",
        category: "",
    });

    useEffect(() => {
        axios.defaults.headers.common["x-access-token"] =
            localStorage.getItem("token");

        async function fetchData() {
            const account_id = props.user._id;
            const user_ = await getUser(account_id);
            setUser(user_.data);
        }

        fetchData();
    }, [props.user._id]);

    useEffect(() => {
        // Comment: If this causes an error, you probably have an invalid account
        if (user !== undefined) {
            if (user.reading_list_books.includes(id)) {
                setShowReadList(false);
            } else {
                setShowReadList(true);
            }
        }
    }, [user, id]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + "/api/books/" + id)
            .then((res) => {
                setOriginalBook(res.data.data);
                setModifiedBook(res.data.data); // copy for modification
            })
            .catch((err) => console.log(err));
    }, [id]);

    let navigate = useNavigate();
    const routeToIndex = () => {
        navigate("/");
    };

    async function getUser(account_id) {
        try {
            const response = await axios.get(
                process.env.REACT_APP_API_URL + "/api/users/" + account_id
            );
            console.log("res", response.data);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    function eraseBookFromDB() {
        axios
            .delete(process.env.REACT_APP_API_URL + "/api/books/" + id)
            .then((res) => {
                console.log(res);
                if (!res.data.data) {
                    console.log("ingen resdata");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function addBorrowerToBook(account_name) {
        let add_to_borrower = {
            borrower: account_name,
            borrowed: true,
        };
        axios
            .patch(
                process.env.REACT_APP_API_URL + "/api/books/" + id,
                add_to_borrower
            )
            .then((res) => {
                if (!res.data) {
                    console.log(res);
                }
                console.log(account_name + " added to borrower");
                console.log(res);
                setOriginalBook(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function removeBorrowerFromBook() {
        let remove_from_borrower = {
            borrower: "i biblioteket",
            borrowed: false,
        };
        axios
            .patch(
                process.env.REACT_APP_API_URL + "/api/books/" + id,
                remove_from_borrower
            )
            .then((res) => {
                if (!res.data) {
                    console.log(res);
                }
                console.log("removed borrower");
                console.log(res);
                setOriginalBook(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function borrowBook() {
        let add_to_loanlist = {
            book: {
                _id: id,
            },
        };
        console.log(add_to_loanlist.book._id);
        console.log(user._id);
        if (user.loan_list_books.includes(id)) {
            console.log("Boken finns redan i lånlistan");
        } else {
            axios
                .patch(
                    process.env.REACT_APP_API_URL +
                    "/api/users/" +
                    user._id +
                    "/loan-list-books",
                    add_to_loanlist
                )
                .then((res) => {
                    if (!res.data) {
                        console.log(res);
                    }
                    console.log("Boken tillagd i lånlistan");
                    setUser(res.data.data);
                    addBorrowerToBook(user.name);
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    async function returnBook() {
        let remove_from_loanlist = {
            book: {
                _id: id,
            },
        };
        if (!user.loan_list_books.includes(id)) {
            console.log("Boken ligger inte i lånlistan");
        } else {
            axios
                .patch(
                    process.env.REACT_APP_API_URL +
                    "/api/users/" +
                    user._id +
                    "/loan-list-books/" +
                    id,
                    remove_from_loanlist
                )
                .then((res) => {
                    console.log("Response:", res);
                    if (!res.data) {
                        console.log("Error:", res);
                    }
                    console.log("Boken borttagen från lånlistan");
                    console.log("Data:", res.data);
                    setUser(res.data.data);
                    removeBorrowerFromBook();
                })
                .catch((err) => {
                    console.log("Error:", err);
                });
        }
    }

    async function addToReadList() {
        let add_to_readlist = {
            book: {
                _id: id,
            },
        };

        if (user.reading_list_books.includes(id)) {
            console.log("Boken finns redan i läslistan");
        } else {
            axios
                .patch(
                    process.env.REACT_APP_API_URL + "/api/users/" + user._id,
                    add_to_readlist
                )
                .then((res) => {
                    if (!res.data) {
                        console.log(res);
                    }
                    console.log("Boken tillagd");
                    console.log(res);
                    setUser(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    async function removeFromReadList() {
        let remove_from_readlist = {
            book: {
                _id: id,
            },
        };
        if (!user.reading_list_books.includes(id)) {
            console.log("Boken finns inte i läslistan");
        } else {
            axios
                .patch(
                    process.env.REACT_APP_API_URL +
                    "/api/users/" +
                    user._id +
                    "/reading-list-books/" +
                    id,
                    remove_from_readlist
                )
                .then((res) => {
                    console.log("Response:", res);
                    if (!res.data) {
                        console.log("Error:", res);
                    }
                    console.log("Boken borttagen");
                    setUser(res.data.data);
                })
                .catch((err) => {
                    console.log("Error:", err);
                });
        }
    }

    function removeBook() {
        eraseBookFromDB();
        routeToIndex();
    }

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + "/api/books/" + id)
            .then((res) => {
                setOriginalBook(res.data.data);
                setModifiedBook(res.data.data); // copy for modification
            })
            .catch((err) => console.log(err));
    }, [id]);

    const editBook = () => {
        setEditBookInfo(true);
    };

    const cancelBook = () => {
        setModifiedBook(originalBook);
        setEditBookInfo(false);
    };

    const handleSave = ({ name, value }) => {
        setModifiedBook({
            ...modifiedBook,
            [name]: value,
        });
    };

    const saveBook = () => {
        console.log(modifiedBook);
        axios
            .patch(
                process.env.REACT_APP_API_URL + "/api/books/" + id,
                modifiedBook
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
        setOriginalBook(modifiedBook);
        setEditBookInfo(false);
    };

    async function showEbook() {
        try {
            const ebook = await axios.get(process.env.REACT_APP_API_URL + `/api/files/ebook` +
                "?filename=" +
                originalBook.filename,
                { responseType: "blob" }
            );
            if (ebook) {
                const blob = new Blob([ebook.data], {
                    type: "application/pdf", //ebook.headers["content-type"],
                });
                const url = window.URL.createObjectURL(blob);
                window.open(url);
                return ebook;
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function uploadEbookFile(file, formData) {
        try {
            const ebook = await axios.get(process.env.REACT_APP_API_URL + `/api/files/ebook` +
                "?filename=" +
                originalBook.filename,
                { responseType: "blob" }
            );
            if (ebook) {
                alert("Filen existerar redan.");
                // TODO Why do we do this?
                const blob = new Blob([ebook.data], {
                    type: "application/pdf", //ebook.headers["content-type"],
                });
                const url = window.URL.createObjectURL(blob);
                window.open(url);
                window.location.reload(true);
                return ebook;
            }
        } catch (error) {
            await axios
                .post(process.env.REACT_APP_API_URL + `/api/files/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    modifiedBook.filename = file.name;
                    saveBook();
                    alert("Filen är uppladdad.");
                })
                .catch((err) => alert(err));
            window.location.reload(true);
        }
    }

    const downloadEbookFile = async (event) => {
        try {
            await axios
                .get(process.env.REACT_APP_API_URL + `/api/files/download` +
                    "?filename=" +
                    originalBook.filename,
                    { responseType: "blob" }
                )
                .then((res) => {
                    const blob = new Blob([res.data], {
                        type: "application/pdf", //res.headers["content-type"],
                    });

                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", originalBook.title);
                    document.body.appendChild(link);
                    link.click();
                    alert("Filen är nedladdad");
                })
                .catch((err) => alert("Filen finns inte."));
        } catch (error) {
            console.log(error);
            alert("Något fel har hänt.");
        }
    };

    const handleUploadEbookFile = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        try {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                uploadEbookFile(file, formData);
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    const deleteEbookFile = async (event) => {
        try {
            await axios
                .delete(process.env.REACT_APP_API_URL + "/api/files/delete" +
                    "?filename=" +
                    originalBook.filename
                )
                .then((res) => {
                    console.log(res);
                    alert("Filen är borttagen.");
                })
                .catch((err) => alert("Filen existerar inte."));
        } catch (error) {
            console.log(error);
        }
        originalBook.filename = null;
        saveBook();
    };

    const addTag = () => {
        // Makes sure it is not an empty tag
        if (typedTag) {
            if (!modifiedBook.tags.includes(typedTag)) {
                // Unless it's a duplicate tag
                modifiedBook.tags.push(typedTag);
            }
            setTypedTag("");
            document.getElementById("tag-input").value = "";
        }
    };

    function deleteTag(tag) {
        console.log("delete tag: " + tag);
        modifiedBook.tags = modifiedBook.tags.filter((t) => t !== tag);
        setModifiedBook(modifiedBook);
        setTypedTag(""); // Trigger reactivity
    }

    return (
        <>
            <HeaderWithoutSearch user={props.user} />
            {
                <main className="Book-Wrapper">
                    <div className="Book-Info">
                        {originalBook.imgstr !== "Bild saknas" && (
                            <div className="Book-Thumbnail">
                                <img
                                    src={originalBook.imgstr}
                                    width="128px"
                                    alt="thumbnail"
                                ></img>
                            </div>
                        )}
                        <div className="Book-Text">
                            {/* TODO: Fix styling for longer book titles */}
                            <EditText
                                id="Book-Title"
                                name="title"
                                defaultValue={modifiedBook.title}
                                onSave={handleSave}
                                inline
                                readonly={!editBookInfo}
                                placeholder={"Titel"}
                            />
                            <br></br>
                            {(modifiedBook.subtitle || editBookInfo) && (
                                <>
                                    <EditText
                                        id="Book-SubTitle"
                                        name="subtitle"
                                        defaultValue={modifiedBook.subtitle}
                                        onSave={handleSave}
                                        inline
                                        readonly={!editBookInfo}
                                        placeholder={"Undertitel"}
                                    />
                                    <br />
                                </>
                            )}
                            <EditText
                                id="Book-Borrower"
                                name="borrower"
                                defaultValue={
                                    originalBook.filename
                                        ? "[E-bok]"
                                        : "[" + originalBook.borrower + "]"
                                }
                                onSave={handleSave}
                                inline
                                readonly={true}
                                placeholder={"Lånad av"}
                            />
                            <br></br>
                            <EditText
                                id="Book-Author"
                                name="author"
                                defaultValue={modifiedBook.author}
                                inline
                                onSave={handleSave}
                                readonly={!editBookInfo}
                                placeholder={"Författare"}
                            />
                            <br></br>
                            <EditText
                                id="Book-Date"
                                name="published"
                                defaultValue={modifiedBook.published}
                                inline
                                onSave={handleSave}
                                readonly={!editBookInfo}
                                placeholder={"Publiceringsdatum"}
                            />
                            <br></br>
                            <EditText
                                id="Book-Category"
                                name="category"
                                defaultValue={modifiedBook.category}
                                inline
                                onSave={handleSave}
                                readonly={!editBookInfo}
                                placeholder={"Kategori"}
                            />
                            <br></br>
                            <EditText
                                id="Book-Publisher"
                                name="publisher"
                                defaultValue={modifiedBook.publisher}
                                inline
                                onSave={handleSave}
                                readonly={!editBookInfo}
                                placeholder={"Förlag"}
                            />
                            <br></br>
                            <EditText
                                id="book-id"
                                defaultValue={modifiedBook._id}
                                inline
                                readonly={true}
                                placeholder={"ISBN"}
                            />
                            <div className="Tags-Wrapper">
                                {modifiedBook.tags &&
                                    modifiedBook.tags.map((tag) => (
                                        <Tag
                                            key={tag}
                                            name={tag}
                                            isbn={originalBook._id}
                                            rm={editBookInfo ? deleteTag : null}
                                            tag={tag}
                                        />
                                    ))}

                                {editBookInfo && (
                                    <div>
                                        <input
                                            type="text"
                                            id="tag-input"
                                            name="tag"
                                            placeholder="ny tagg"
                                            onInput={(e) =>
                                                setTypedTag(e.target.value)
                                            }
                                        />
                                        <button
                                            type="button"
                                            id="tag-submit"
                                            onClick={addTag}
                                        >
                                            Lägg till tagg
                                        </button>
                                    </div>
                                )}
                            </div>
                            <br></br>
                            {!editBookInfo ? (
                                <div
                                    id="Book-Body"
                                    dangerouslySetInnerHTML={{
                                        __html: modifiedBook.body,
                                    }}
                                />
                            ) : (
                                <Editor
                                    apiKey="r7juf1sqhlfm1lhb72goyuqokl24opmld6egjhatq2w3tugm"
                                    initialValue={modifiedBook.body}
                                    init={{
                                        plugins: ["lists"],
                                        toolbar:
                                            "undo redo | blocks | bold italic | bullist | alignleft aligncenter alignright alignjustify | outdent indent",
                                        menubar:
                                            "edit insert format table help",
                                    }}
                                    onEditorChange={(newText) =>
                                        (modifiedBook.body = newText)
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        {!editBookInfo && (
                            <div className="Book-buttons">
                                {originalBook.filename && (
                                    <div className="Book-buttons">
                                        <button
                                            type="button"
                                            id="borrow-submit"
                                            onClick={showEbook}
                                        >
                                            Visa e-bok
                                        </button>
                                        <button
                                            type="button"
                                            id="borrow-submit"
                                            onClick={downloadEbookFile}
                                        >
                                            Ladda ned e-bok
                                        </button>
                                    </div>
                                )}
                                {!originalBook.filename &&
                                    (!originalBook.borrowed ? (
                                        <div className="Borrow-Book">
                                            <button
                                                type="button"
                                                id="borrow-submit"
                                                onClick={borrowBook}
                                            >
                                                Låna
                                            </button>
                                        </div>
                                    ) : (
                                        originalBook.borrower ===
                                        props.user.name && (
                                            <div className="Return-Book">
                                                <button
                                                    type="button"
                                                    id="return-submit"
                                                    onClick={returnBook}
                                                >
                                                    Lämna tillbaka
                                                </button>
                                            </div>
                                        )
                                    ))}

                                {showReadList ? (
                                    <div className="ReadList-Book">
                                        <button
                                            type="button"
                                            id="readlist-submit"
                                            onClick={addToReadList}
                                        >
                                            Lägg i läslistan
                                        </button>
                                    </div>
                                ) : (
                                    <div className="Remove-ReadList-Book">
                                        <button
                                            type="button"
                                            id="readlist-remove"
                                            onClick={removeFromReadList}
                                        >
                                            Ta bort från läslistan
                                        </button>
                                    </div>
                                )}

                                {!showResults && (
                                    <button
                                        type="button"
                                        id="edit-book"
                                        onClick={editBook}
                                    >
                                        Ändra
                                    </button>
                                )}
                            </div>
                        )}

                        {editBookInfo && (
                            <div className="Book-buttons">
                                {!originalBook.filename ? (
                                    <div>
                                        <label htmlFor="browse-button">
                                            <div
                                                type="button"
                                                id="upload-button"
                                            >
                                                Ladda upp e-bok
                                            </div>
                                            <input
                                                type="file"
                                                id="browse-button"
                                                onChange={handleUploadEbookFile}
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        id="borrow-submit"
                                        onClick={deleteEbookFile}
                                    >
                                        Ta bort e-bok
                                    </button>
                                )}
                                <div className="Align-h">
                                    <button
                                        type="button"
                                        id="edit-book"
                                        onClick={saveBook}
                                    >
                                        Spara
                                    </button>
                                    <button
                                        type="button"
                                        id="edit-book"
                                        onClick={cancelBook}
                                    >
                                        Avbryt
                                    </button>
                                </div>
                                <div className="Remove-Book">
                                    <button
                                        type="button"
                                        id="isbn-remove"
                                        onClick={removeBook}
                                    >
                                        Ta bort bok
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            }
        </>
    );
}

export default Book;
