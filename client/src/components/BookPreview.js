import React, {useEffect, useState} from 'react'

import './css/BookPreview.css';

import {
    Link
} from "react-router-dom";

function BookPreview(props) {
    const [title, setTitle] = useState(undefined);
    const [desc, setDesc] = useState(undefined);
    const [img, setImg] = useState(undefined);

    useEffect(() => {
        var isbn = require('node-isbn');
        isbn.resolve(props.id, function (err, book) {
            if (err) {
                console.log('Book not found', err);
            } else {
                setTitle(book.title);
                setDesc(book.description);
                setImg(book.imageLinks.thumbnail);
                console.log(book);
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
            <p><b>TITLE:</b>  <Link to={"/books/" + props.id}>{title}</Link></p>
            {
                desc ? <><hr/><p><b>DESCRIPTION:</b> {desc}</p></> : <></>
                // TODO: Collapse text and add '...' if text is too long
            }
            <hr/>
            <p><b>ISBN13:</b> {props.id}</p>
            {
                props.tags ? <><hr/><p><b>TAGS:</b></p></> : <></>
                // TODO: Map all tags from response to <Tag\>-tag
                // TODO: Hide some tags if there are too many
            }
        </div>
    </div>);
}

export default BookPreview;