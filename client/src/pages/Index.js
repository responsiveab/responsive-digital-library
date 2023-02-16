import BookPreview from "../components/BookPreview"

function Index() {
    return (
    <main className="App-content">
        <h1>Welcome to Responsive Digital Library</h1>
        <p>
          Here you will be able to keep track of your books.
        </p>
        <BookPreview title={"Study Manual for the Test of Essential Academic Skills"} desc={"This book is written by Assessment Technologies Inc. Staff"} id={9781933107981}/>
        <BookPreview title={"Preparing for the Biology AP* Exam"} desc={"Good for students"} id={9780133458145}/>
    </main>);
}

export default Index;