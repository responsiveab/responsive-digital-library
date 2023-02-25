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
    const [img, setImg] = useState(undefined);
    // eslint-disable-next-line
    const [tags, setTags] = useState([]);
    const [active, setActive] = useState(false);

    // TODO: Fetch image from database
    useEffect(() => {
        var isbn = require('node-isbn');
        isbn.resolve(props.id, function (err, book) {
            if (!err) {
                setImg(book.imageLinks.thumbnail);
            }
        });

        axios.get("http://localhost:8080/api/books/" + props.id)
        .then(res => {
            if(res.data.data) {
                for(var i = 0; i < res.data.data.tags.length; i++) {
                    axios.get("http://localhost:8080/api/tags/" + res.data.data.tags[i])
                    .then(res => {
                        tags.push(res.data.data.name)
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
                <img src={img} width="128px" alt="cover"></img>
            }
        </div>
        <div className="MetaData-Wrapper">
            {/*<Link to={"/books/" + props.id}>{props.title}</Link>*/}
            <h3><b><a onClick={toggleActive}>{props.title}</a></b></h3>
            {
                props.author ? <div className='metatext'><p>{props.author}</p></div> : <></>
            }
            {
                props.body ? <div className='metatext'><p><i>{trimString(props.body)}</i></p></div> : <></>
            }
            {/*TODO: see if we want this, <p><b>ISBN:</b> {props.id}</p>*/}
            {
                tags ? <div className='tags-wrapper'>{tags.map((tag) => <Tag key={tag} content={tag} />)}</div> : <></>
                // TODO: Map all tags from response to <Tag\>-tag
                // TODO: Hide some tags if there are too many
            }
        </div>
    </div>
    {active && <DetailedBookPreview id={props.id} title={props.title} body={props.body} author={props.author} place={"H1"}/>}
    </>);
}

export default BookPreview;