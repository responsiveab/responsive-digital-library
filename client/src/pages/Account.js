import HeaderWithoutSearch from "../components/headers/HeaderWithoutSearch";
import "./css/Account.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReadingListPreview from "../components/ReadingListPreview";
import LoanListPreview from "../components/LoanListPreview";

function Account(props) {
    const [books, setBooks] = useState();
    const [user, setUser] = useState(undefined);
    const [loanBooks, setLoanBooks] = useState(undefined);
    const [loanBooksId, setLoanBooksId] = useState(undefined);
    const [readBooksId, setReadBooksId] = useState(undefined);
    const [readBooks, setReadBooks] = useState(undefined);

    useEffect(async () => {
        axios.defaults.headers.common["x-access-token"] =
            localStorage.getItem("token");
        const account_id = props.user._id;
        const user_ = await getUser(account_id);
        setUser(user_.data);
    }, []);

    useEffect(() => {
        if (user !== undefined) {
            setReadBooksId(user.reading_list_books);
            setLoanBooksId(user.loan_list_books);
        }
    }, [user]);

    useEffect(async () => {
        if (readBooksId !== undefined) {
            const idList = readBooksId;
            await axios
                .get(
                    `http://localhost:8080/api/books/list?ids=${idList.join(
                        ","
                    )}`
                )
                .then((res) => {
                    console.log(res.data.data);
                    setReadBooks(res.data.data);
                })
                .catch((error) => console.error(error));
        }
    }, [readBooksId]);

    useEffect(async () => {
        if (loanBooksId !== undefined) {
            const idList = loanBooksId;
            await axios
                .get(
                    `http://localhost:8080/api/books/list?ids=${idList.join(
                        ","
                    )}`
                )
                .then((res) => {
                    console.log(res.data.data);
                    setLoanBooks(res.data.data);
                })
                .catch((error) => console.error(error));
        }
    }, [loanBooksId]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + "/api/books/")
            .then((res) => {
                setBooks(res.data.data);
                console.log(res.data.data);
            })
            .catch((error) => console.error(error));
        // eslint-disable-next-line
    }, []);

    async function getUser(account_id) {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/users/" + account_id
            );
            console.log("res", response.data);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <HeaderWithoutSearch user={props.user} />
            {props.user && (
                <>
                    {
                        <main className="Account-Wrapper">
                            <div className="container">
                                <div className="flex-container">
                                    <div className="left-column">
                                        <div className="information">
                                            {/* <div className='Photo'></div> */}
                                            <div className="User">
                                                <h1>{props.user.name}</h1>
                                                <h2>{props.user.email}</h2>
                                            </div>
                                        </div>
                                        <div className="reading-list">
                                            <h1 className="section-header">
                                                Läslista
                                            </h1>
                                            {readBooks ? (
                                                readBooks.map((book) => (
                                                    <span key={book._id}>
                                                        <ReadingListPreview
                                                            id={book._id}
                                                            title={book.title}
                                                            author={book.author}
                                                            body={book.body}
                                                            img={book.imgstr}
                                                            taglis={book.tags}
                                                        />
                                                    </span>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="loan-list">
                                        <h1 className="section-header">
                                            Mina Lån
                                        </h1>
                                        {loanBooks ? (
                                            loanBooks.map((book) => (
                                                <span key={book._id}>
                                                    <LoanListPreview
                                                        id={book._id}
                                                        title={book.title}
                                                        author={book.author}
                                                        body={book.body}
                                                        taglis={book.tags}
                                                    />
                                                </span>
                                            ))
                                        ) : (
                                            <></>
                                        )}
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
            )}
        </>
    );
}

export default Account;
