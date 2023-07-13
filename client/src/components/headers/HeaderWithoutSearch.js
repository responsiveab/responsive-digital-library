import { Link } from "react-router-dom";
import { BiPlusCircle, BiUserCircle } from "react-icons/bi";
import { logout } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import ".././css/HeaderWithoutSearch.css";

function HeaderWithoutSearch(props) {
    const navigate = useNavigate("");

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
                    {/* Placeholder for Responsive logo */}
                    <img
                        src={process.env.PUBLIC_URL + "/logo-rdl.png"}
                        className="img-icon"
                        alt=""
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
