import {Link} from 'react-router-dom';
import {BiPlusCircle, BiUserCircle, BiSearch, BiFilter} from "react-icons/bi";
import '.././css/HeaderWithoutSearch.css'
// import '.././css/Header.css'
import { useState } from 'react';
import Tag from '../Tag'


function HeaderWithoutSearch() {
    const [tags, setTags] = useState(undefined);



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
                    <img src={process.env.PUBLIC_URL + "/logo-rdl.png"} className="img-icon"/>
                </Link>
            </div>
            <div className="hr-without-search">
                <hr/>
            </div>
        </header>);
}

export default HeaderWithoutSearch;