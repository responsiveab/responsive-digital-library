import {Link} from 'react-router-dom';
import {BiPlusCircle, BiUserCircle, BiHome} from "react-icons/bi";

function Header() {
    return (
        <header className="App-header">
            <div style={{ float: 'left' }}>
                <Link to="/books/add">
                    <BiPlusCircle color="white"/>
                </Link>
            </div>
            <div style={{ float: 'right' }}>
                <Link to="/account">
                    <BiUserCircle color="white"/>
                </Link>
                <Link to="/">
                    {/* Placeholder for Responsive logo */}
                    <BiHome color="white"/>
                </Link>
            </div>
            <p>Responsive Digital Library</p>
        </header>);
}

export default Header;