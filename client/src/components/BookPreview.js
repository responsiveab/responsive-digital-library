import React, {useEffect, useState} from 'react'

import './css/BookPreview.css';
import Tag from './Tag'

import DetailedBookPreview from './DetailedBookPreview';

function trimString(string){
    var textLength = 200;
    var trimmedString = string.substr(0, textLength);
    if (string.length <= trimmedString.length){trimmedString+=" "};
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    if (string.length > trimmedString.length){trimmedString+="..."};
    return trimmedString;
}

function BookPreview(props) {
    // eslint-disable-next-line
    const [tags, setTags] = useState([]);
    const [active, setActive] = useState(false);

    const [count, setCount] = useState(5);

    useEffect(() => {
        setTags(props.taglis)
    // eslint-disable-next-line
    }, [])

    function toggleActive() {
        setActive(!active)
    }

    function increaseCount() {
        setCount(count + 5)
    }

    return (
    <>
    <div className="BookPreview-Wrapper">
        <div className="CoverImage-Wrapper">
            {
                <img src={props.img} width="128px" alt="cover"></img>
            }
        </div>
        <div className="MetaData-Wrapper">
            <h3><b><a onClick={toggleActive}>{props.title}</a></b></h3>
            {
                props.author ? <div className='metatext'><p>{props.author}</p></div> : <></>
            }
            {
                props.body ? <div className='metatext'><p><i>{trimString(props.body)}</i></p></div> : <></>
            }
            {
                tags ? <div className='tags-wrapper'>
                    {tags.slice(0, count).map((tag) => <Tag key={tag} content={tag} />)}
                    {count < tags.length && <span className='Expander'><a href="#" onClick={increaseCount}>...</a></span>}</div> : <></>
                // TODO: Hide some tags if there are too many
            }
        </div>
    </div>
    {active && <DetailedBookPreview id={props.id} 
                                    title={props.title} 
                                    body={props.body} 
                                    author={props.author}
                                    shelf={props.shelf}
                                    category={props.category}
                                    language={props.language}
                                    publisher={props.publisher}
                                    borrower={props.borrower}
                                    borrowed = {props.borrowed}
                                    date={props.date}
                                    img={props.img}
                                    tags={tags}/>}
    </>);
}

export default BookPreview;