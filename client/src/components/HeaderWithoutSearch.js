import {Link} from 'react-router-dom';
import {BiPlusCircle, BiUserCircle, BiHome} from "react-icons/bi";
import './css/Header.css'

function HeaderWithoutSearch() {
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
            <hr/>
        </header>);
}

export default HeaderWithoutSearch;