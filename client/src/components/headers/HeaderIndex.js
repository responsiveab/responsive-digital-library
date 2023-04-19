import {Link} from 'react-router-dom';
import {BiPlusCircle, BiUserCircle, BiSearch, BiFilter} from "react-icons/bi";
import '.././css/Header.css'
import { useState } from 'react';
import Tag from '../Tag'
import Index from '../../pages/Index';


function HeaderIndex() {
    const [tags, setTags] = useState(undefined);
    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
      setInputText(e.target.value);
    };

    function appendTag(tag) {
        if(tags) {
            setTags(tags.concat([tag]))
        }
        else {
            setTags([tag])
        }
    }

    const handleChange = e => {
        if(e.key == "Enter") {
            if(e.target.value[0] == '#') {
                appendTag(e.target.value.substring(1, e.target.value.length))
                document.getElementById('search').value = ''
            }
        }
    }

    return (
        <main className="App-content">
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
            <div className='searchbar'>
                <BiSearch className="icon" id="search-left"/>
                {/* <input type="text" id="search" name="search" onKeyPress={handleChange}/> */}
                <input 
                  type="text" 
                  id="search" 
                  name="search"
                  onChange={inputHandler}
                  />
                <BiFilter className="icon" id="search-right"/>
            </div>
            {tags &&
            <div className='Tag-Search-Area'>
                {tags.map((t) => <Tag key={t} content={t} />) }
            </div>
             }
            <hr/>
            </header>
            <div className="Index">
                <Index input={inputText}/>
            </div>
        </main>
        );
}

export default HeaderIndex;