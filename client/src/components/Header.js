import {Link} from 'react-router-dom';
import {BiPlusCircle, BiUserCircle, BiHome, BiSearch, BiFilter} from "react-icons/bi";
import './css/Header.css'

function Header() {
    return (
        <header className="App-header">
            <div style={{ float: 'left' }}>
                <Link to="/books/add">
                    <BiPlusCircle className="icon"/>
                </Link>
            </div>
            <div style={{ float: 'right' }}>
                <Link to="/account">
                    <BiUserCircle className="icon"/>
                </Link>
                <Link to="/">
                    {/* Placeholder for Responsive logo */}
                    <BiHome className="icon"/>
                </Link>
            </div>
            <div className='searchbar'>
                <BiSearch className="icon" id="search-left"/>
                <input type="text" id="search" name="search"/>
                <BiFilter className="icon" id="search-right"/>
            </div>
            <hr/>
        </header>);
}

export default Header;