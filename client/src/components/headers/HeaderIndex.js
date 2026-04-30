import { Link, useLocation } from "react-router-dom";
import { BiPlusCircle, BiUserCircle, BiSearch } from "react-icons/bi";
import ".././css/Header.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Index from "../../pages/Index";
import { logout } from "../../utils/utils";

function HeaderIndex({ user }) {
    const [searchText, setSearchText] = useState("");
    const [dbTags, setDbTags] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const locationSearchText = location.state?.searchText;
        if (locationSearchText) {
            // Tag clicked elsewhere brought us here — start a fresh search by tag.
            setSearchText(`#${locationSearchText}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + "/api/tags")
            .then((res) =>
                setDbTags((res.data.data || []).map((t) => t._id))
            )
            .catch((err) => console.log(err));
    }, []);

    // Returns { fragment, completedTags }: the partial tag the user is currently
    // typing (or null if not typing one), and the lowercased tags already
    // committed earlier in the search string.
    function analyzeSearch(text) {
        const raw = (text || "").split(/\s+/);
        const last = raw[raw.length - 1] || "";
        const completed = raw.slice(0, -1).filter(Boolean);
        const completedTags = completed
            .filter((t) => t.startsWith("#") && t.length > 1)
            .map((t) => t.slice(1).toLowerCase());
        const fragment = last.startsWith("#")
            ? last.slice(1).toLowerCase()
            : null;
        return { fragment, completedTags };
    }

    const searchHandler = (e) => {
        const value = e.target.value;
        setSearchText(value);
        setShowSuggestions(analyzeSearch(value).fragment !== null);
        setSelectedIndex(0);
    };

    function completeTag(tag) {
        const parts = searchText.split(/\s+/);
        parts[parts.length - 1] = `#${tag}`;
        setSearchText(parts.join(" ") + " ");
        setShowSuggestions(false);
        setSelectedIndex(0);
    }

    const onInputKeyDown = (e) => {
        if (!showSuggestions || matchingTags.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((i) => (i + 1) % matchingTags.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(
                (i) => (i - 1 + matchingTags.length) % matchingTags.length
            );
        } else if (e.key === "Enter" || e.key === "Tab") {
            e.preventDefault();
            completeTag(
                matchingTags[Math.min(selectedIndex, matchingTags.length - 1)]
            );
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    function updateSearchText(text) {
        const newToken = `#${text}`;
        const tokens = searchText.split(/\s+/).filter(Boolean);
        if (tokens.includes(newToken)) return;
        const sep = searchText && !searchText.endsWith(" ") ? " " : "";
        setSearchText(searchText + sep + newToken);
    }

    const { fragment, completedTags } = analyzeSearch(searchText);
    const matchingTags =
        fragment !== null
            ? dbTags.filter((t) => {
                  const lc = t.toLowerCase();
                  return (
                      lc.includes(fragment) && !completedTags.includes(lc)
                  );
              })
            : [];

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
                                    Hej {user.name}!
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
                <div className="searchbar" style={{ position: "relative" }}>
                    <BiSearch className="icon" id="search-left" />
                    <input
                        id="searchInput"
                        type="search"
                        name="search"
                        autoComplete="off"
                        onChange={searchHandler}
                        onKeyDown={onInputKeyDown}
                        onFocus={() =>
                            setShowSuggestions(
                                analyzeSearch(searchText).fragment !== null
                            )
                        }
                        onBlur={() =>
                            // Delay so a click on a suggestion still fires.
                            setTimeout(() => setShowSuggestions(false), 150)
                        }
                        value={searchText}
                    />
                    {showSuggestions && matchingTags.length > 0 && (
                        <ul
                            style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                margin: 0,
                                padding: 0,
                                listStyle: "none",
                                background: "white",
                                color: "black",
                                textAlign: "left",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                maxHeight: "240px",
                                overflowY: "auto",
                                zIndex: 1000,
                                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            }}
                        >
                            {matchingTags.map((tag, i) => (
                                <li
                                    key={tag}
                                    onMouseDown={(e) => {
                                        // mousedown fires before blur, so completeTag
                                        // runs before the dropdown closes itself.
                                        e.preventDefault();
                                        completeTag(tag);
                                    }}
                                    onMouseEnter={() => setSelectedIndex(i)}
                                    style={{
                                        padding: "6px 12px",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        color: "black",
                                        background:
                                            i === selectedIndex
                                                ? "#e8e8e8"
                                                : "transparent",
                                    }}
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <hr />
            </header>

            <div className="Index">
                <Index
                    searchText={searchText}
                    updateSearch={updateSearchText}
                    setSearchText={setSearchText}
                />
            </div>
        </main>
    );
}

export default HeaderIndex;
