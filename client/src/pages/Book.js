import './css/Book.css'

import {
    useParams
} from "react-router-dom";

function Book(props) {
    let { id } = useParams();

    return (
    <main className='Book-Wrapper'>
        <h1 className='Book-Title'>ISBN13: {id}</h1>
    </main>);
}

export default Book;