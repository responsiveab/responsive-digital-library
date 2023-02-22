import React, {useEffect, useState} from 'react'

import './css/BookPreview.css';

import {
    Link
} from "react-router-dom";

function BookPreview(props) {
    const [img, setImg] = useState(undefined);

    // TODO: Fetch image from database
    useEffect(() => {
        var isbn = require('node-isbn');
        isbn.resolve(props.id, function (err, book) {
            if (err) {
                console.log('Book not found', err);
            } else {
                setImg(book.imageLinks.thumbnail);
            }
        });
    // eslint-disable-next-line
    }, [])

    return (
    <div className="BookPreview-Wrapper">
        <div className="CoverImage-Wrapper">
            {
                <img src={img} width="128px" alt="cover"></img>
            }
        </div>
        <div className="MetaData-Wrapper">
            <p><b>TITLE:</b>  <Link to={"/books/" + props.id}>{props.title}</Link></p>
            {
                props.body ? <><hr/><p><b>DESCRIPTION:</b> {props.body}</p></> : <></>
                // TODO: Collapse text and add '...' if text is too long
            }
            {
                props.author ? <><hr/><p><b>AUTHOR:</b> {props.author}</p><hr/></> : <></>
            }
            <p><b>ISBN:</b> {props.id}</p>
            {
                props.tags ? <><hr/><p><b>TAGS:</b></p></> : <></>
                // TODO: Map all tags from response to <Tag\>-tag
                // TODO: Hide some tags if there are too many
            }
        </div>
    </div>);
}

export default BookPreview;