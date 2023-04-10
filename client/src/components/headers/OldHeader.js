// import {Link} from 'react-router-dom';
// import {BiPlusCircle, BiUserCircle, BiSearch, BiFilter} from "react-icons/bi";
// import '.././css/Header.css'
// import { useState } from 'react';
// import Tag from '../Tag'


// function Header() {
//     const [tags, setTags] = useState(undefined);

//     function appendTag(tag) {
//         if(tags) {
//             setTags(tags.concat([tag]))
//         }
//         else {
//             setTags([tag])
//         }
//     }

//     const handleChange = e => {
//         if(e.key == "Enter") {
//             if(e.target.value[0] == '#') {
//                 appendTag(e.target.value.substring(1, e.target.value.length))
//                 document.getElementById('search').value = ''
//             }
//         }
//     }

//     return (
//         <header className="App-header">
//             <div style={{ float: 'left' }}>
//                 <Link to="/books/add">
//                     <BiPlusCircle className="icon"/>
//                 </Link>
//             </div>
//             <div style={{ float: 'right' }}>
//                 <Link to="/account">
//                     <BiUserCircle className="icon"/>
//                 </Link>
//                 <Link to="/">
//                     {/* Placeholder for Responsive logo */}
//                     <img src={process.env.PUBLIC_URL + "/logo-rdl.png"} className="img-icon"/>
//                 </Link>
//             </div>
//             <div className='searchbar'>
//                 <BiSearch className="icon" id="search-left"/>
//                 <input type="text" id="search" name="search" onKeyPress={handleChange}/>
//                 <BiFilter className="icon" id="search-right"/>
//             </div>
//             {tags &&
//             <div className='Tag-Search-Area'>
//                 {tags.map((t) => <Tag key={t} content={t} />) }
//             </div>
//              }
//             <hr/>
//         </header>);
// }

// export default Header;