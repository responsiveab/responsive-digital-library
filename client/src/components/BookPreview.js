import './css/BookPreview.css';

import {
    Link
} from "react-router-dom";

function BookPreview(props) {
    return (
    <div className="BookPreview-Wrapper">
        <div className="CoverImage-Wrapper">
            {
                <img src={"https://images.isbndb.com/covers/79/81/" + props.id + ".jpg"} width="128px"></img>
                // TODO: Send whole src path through props
            }
        </div>
        <div className="MetaData-Wrapper">
            <p><b>TITLE:</b>  <Link to={"/books/" + props.id}>{props.title}</Link></p>
            {
                props.desc ? <><hr/><p><b>DESCRIPTION:</b> {props.desc}</p></> : <></>
                // COMMENT: This field does not necessarily exist
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