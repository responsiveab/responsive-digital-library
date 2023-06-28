import { Link } from "react-router-dom";
import { BiPlusCircle, BiUserCircle, BiSearch } from "react-icons/bi";
import ".././css/Header.css";
import { useState } from "react";
import Index from "../../pages/Index";
import Tag from "../../components/Tag";

function HeaderIndex(props) {
    const [searchText, setSearchText] = useState("");

    let inputHandler = (e) => {
        setSearchText(e.target.value);
    };

    function updateSearchText(text) {
        let searchText = "";
        if (document.getElementById("searchInput").value[0] === "#") {
            // When we already are searching for tags
            document.getElementById("searchInput").value =
                document.getElementById("searchInput").value + "#" + text;
        } else {
            // When it's the first tag we are looking for, either by clicking on a tag or by typing.
            // If there is something typed before, this would be removed.
            document.getElementById("searchInput").value = "#" + text;
        }
        searchText = document.getElementById("searchInput").value;
        setSearchText(searchText);
    }

    return (
        <main className="App-content">
            <header className="App-header">
                <div style={{ float: "left" }}>
                    <Link to="/books/add">
                        <BiPlusCircle className="icon"></BiPlusCircle>
                    </Link>
                </div>
                <div style={{ float: "right" }}>
                    <div className="dropdown">
                        <button className="dropbtn">
                            <BiUserCircle className="icon"></BiUserCircle>
                        </button>
                        <div className="item-list-wrapper">
                            <div className="dropdown-content">
                                <p className="dropdown-header">
                                    Hej {props.user.name}
                                </p>
                                <Link to="/account">Profil</Link>
                                <a href="#">Mina Böcker</a>
                                <a href="#">Logga ut</a>
                            </div>
                        </div>
                    </div>
                    <Link to="/">
                        {/* Placeholder for Responsive AB logo */}
                        <img
                            src={process.env.PUBLIC_URL + "/logo-rdl.png"}
                            className="img-icon"
                        />
                    </Link>
                </div>
                <div className="searchbar">
                    <BiSearch className="icon" id="search-left" />
                    {/* <input type="text" id="search" name="search" onKeyPress={handleChange}/> */}
                    <input
                        id="searchInput"
                        type="search"
                        name="search"
                        onChange={inputHandler}
                    />
                    {/* Meant to initially support multiple filter functions for the search */
                    /* <BiFilter className="icon" id="search-right"/> */}
                </div>
                <hr />
            </header>

            <div id="extraTags">
                {[
                    "Andra etiketter",
                    "som de filterade böckerna har",
                    "ska visas här",
                    "så man kan lägga till dom i sökningen",
                ].map((tag) => (
                    <Tag key={tag} name={tag} />
                ))}
            </div>

            <div className="Index">
                <Index input={searchText} updateSearch={updateSearchText} />
            </div>
        </main>
    );
}

export default HeaderIndex;
