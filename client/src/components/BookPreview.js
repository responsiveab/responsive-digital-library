import React, {useEffect, useState} from 'react'

import './css/BookPreview.css';
import Tag from './Tag'

import axios from 'axios';
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

    useEffect(() => {
        axios.get("http://localhost:8080/api/books/" + props.id)
        .then(res => {
            if(res.data.data) {
                for(var i = 0; i < res.data.data.tags.length; i++) {
                    axios.get("http://localhost:8080/api/tags/" + res.data.data.tags[i])
                    .then(res => {
                        setTags(tags.concat([res.data.data.name]))
                    })
                    .catch(err => console.log(err))
                }
            }
        })
        .catch(err => console.log(err))
    // eslint-disable-next-line
    }, [])

    function toggleActive() {
        setActive(!active)
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
                tags ? <div className='tags-wrapper'>{tags.map((tag) => <Tag key={tag} content={tag} />)}</div> : <></>
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
                                    date={props.date}
                                    img={props.img}/>}
    </>);
}

export default BookPreview;