import React, {useEffect, useState} from 'react'

import './css/DetailedBookPreview.css';
import Tag from './Tag'

import {BiFullscreen, BiX} from "react-icons/bi";

import {
    Link
} from "react-router-dom";

function DetailedBookPreview(props) {
    return (
    <div className='Overlay'>
        <div className="DetailedBookPreview-Wrapper">
            <div className="DetailedCoverImage-Wrapper">
                {
                    <img src={props.img} width="128px" alt="cover"></img>
                }
            </div>
            <div className="DetailedMetaData-Wrapper">
                <div className='Button-Wrapper'>
                    <Link to={"/books/" + props.id}><BiFullscreen></BiFullscreen></Link>
                    <a href="/"><BiX></BiX></a>
                </div>
                <h3>
                    {console.log(props.borrowed)}
                    {console.log("BORROWER: "+props.borrower)}
                    <b>
                        {props.title} [{props.borrowed ? props.borrower : props.shelf}]
                    </b>
                </h3>
                {
                    props.author ? <div className='metatext'><p>{props.author}</p></div> : <></>
                }
                {
                    props.body ? <div className='metatext'><p><i>{props.body}</i></p></div> : <></>
                }
                {
                    props.tags ? <div className='tags-wrapper'>{props.tags.map((tag) => <Tag key={tag} content={tag} />)}</div> : <></>
                }
            </div>
        </div>
    </div>);
}

export default DetailedBookPreview;