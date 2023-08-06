import { Link } from "react-router-dom";
import { BiPlusCircle, BiUserCircle, BiSearch } from "react-icons/bi";
import ".././css/Header.css";
import { useEffect, useState } from "react";
import Index from "../../pages/Index";
import { logout } from "../../utils/utils";

function HeaderIndex(props) {
    const [searchText, setSearchText] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    let searchHandler = (e) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        const hr = document.getElementsByTagName("hr")[0];
        const search = document.getElementsByClassName("searchbar")[0];

        search.classList.toggle("hidden");
        hr.classList.toggle("hr-without-search");
        setShowSearch((showSearch) => !setShowSearch);
    }, showSearch);

    function updateSearchText(text) {
        let searchText = document.getElementById("searchInput").value;
        if (searchText[0] === "#") {
            // We are already searching for tags
            const searchedTags = searchText.split("#");
            if (!searchedTags.includes(text)) {
                searchText = searchText + "#" + text;
            }
        } else {
            // When it's the first tag we are looking for, either by clicking on a tag or by typing.
            // Reset any other search text
            searchText = "#" + text;
        }
        document.getElementById("searchInput").value = searchText;
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
                                    Hej {props.user.name}!
                                </p>
                                <Link to="/account">Profil</Link>
                                <a href="/">Mina Böcker</a>
                                <a
                                    href="/"
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    Logga ut
                                </a>
                            </div>
                        </div>
                    </div>
                    <Link to="/">
                        {/* Placeholder for Responsive AB logo */}
                        <img
                            alt="logo"
                            src={process.env.PUBLIC_URL + "/logo-rdl.png"}
                            className="img-icon"
                        />
                    </Link>
                </div>
                <div className="searchbar hidden">
                    <BiSearch className="icon" id="search-left" />
                    {/* <input type="text" id="search" name="search" onKeyPress={handleChange}/> */}
                    <input
                        id="searchInput"
                        type="search"
                        name="search"
                        onChange={searchHandler}
                    />
                    {/* Meant to initially support multiple filter functions for the search */
                    /* <BiFilter className="icon" id="search-right"/> */}
                </div>

                <hr className="hr-without-search" />
            </header>

            <div className="Index">
                <Index
                    searchText={searchText}
                    updateSearch={updateSearchText}
                />
            </div>
        </main>
    );
}

export default HeaderIndex;
