import './css/Book.css'

function Book(props) {
    return (
    <main className='Book-Wrapper'>
        <h1 className='Book-Title'>{props.title}</h1>
        <p className='Small-Text'>{props.desc}</p>
    </main>);
}

export default Book;