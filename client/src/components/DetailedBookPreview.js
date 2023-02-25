import React, {useEffect, useState} from 'react'

import './css/DetailedBookPreview.css';
import Tag from './Tag'

import {BiPencil, BiFullscreen, BiX} from "react-icons/bi";

import {
    Link
} from "react-router-dom";

import axios, * as others from 'axios';

function DetailedBookPreview(props) {
    const [img, setImg] = useState(undefined);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        var isbn = require('node-isbn');
        isbn.resolve(props.id, function (err, book) {
            if (err) {
                console.log('Book not found', err);
            } else {
                setImg(book.imageLinks.thumbnail);
            }
        });

        axios.get("http://localhost:8080/api/books/" + props.id)
        .then(res => {
            for(var i = 0; i < res.data.data.tags.length; i++) {
                axios.get("http://localhost:8080/api/tags/" + res.data.data.tags[i])
                .then(res => {
                    tags.push(res.data.data.name)
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    // eslint-disable-next-line
    }, [])

    return (
    <div className='Overlay'>
        <div className="DetailedBookPreview-Wrapper">
            <div className="DetailedCoverImage-Wrapper">
                {
                    <img src={img} width="128px" alt="cover"></img>
                }
            </div>
            <div className="DetailedMetaData-Wrapper">
                <div className='Button-Wrapper'>
                    <Link to={"/books/" + props.id}><BiFullscreen></BiFullscreen></Link>
                    <a href="/"><BiX></BiX></a>
                </div>
                <h3><b>{props.title}</b></h3>
                {
                    props.author ? <div className='metatext'><p>{props.author}</p></div> : <></>
                }
                {
                    props.body ? <div className='metatext'><p><i>{props.body}</i></p></div> : <></>
                }
                {
                    tags ? <div className='tags-wrapper'>{tags.map((tag) => <Tag key={tag} content={tag} />)}</div> : <></>
                }
            </div>
        </div>
    </div>);
}

export default DetailedBookPreview;