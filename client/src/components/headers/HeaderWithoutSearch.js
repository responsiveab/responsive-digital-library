import { Link } from "react-router-dom";
import { BiPlusCircle, BiUserCircle, BiSearch, BiFilter } from "react-icons/bi";
import ".././css/HeaderWithoutSearch.css";
// import '.././css/Header.css'
import { useState } from "react";
import Tag from "../Tag";

function HeaderWithoutSearch(props) {
    const [tags, setTags] = useState(undefined);

    return (
        <header className="App-header">
            <div style={{ float: "left" }}>
                <Link to="/books/add">
                    <BiPlusCircle className="icon" />
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
                    {/* Placeholder for Responsive logo */}
                    <img
                        src={process.env.PUBLIC_URL + "/logo-rdl.png"}
                        className="img-icon"
                    />
                </Link>
            </div>
            <div className="hr-without-search">
                <hr />
            </div>
        </header>
    );
}

export default HeaderWithoutSearch;
