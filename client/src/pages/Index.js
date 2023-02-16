import BookPreview from "../components/BookPreview"

function Index() {
    return (
    <main className="App-content">
        <h1>Welcome to Responsive Digital Library</h1>
        <p>
          Here you will be able to keep track of your books.
        </p>
        <BookPreview id={9781933107981}/>
        <BookPreview id={9780133458145}/>
    </main>);
}

export default Index;