import './css/Tag.css';

import {
    Link
} from "react-router-dom";

function Tag(props) {
    return (
    <div className='Tag-Wrapper'>
        <Link to={"../search/tag/" + props.content}>{props.content}</Link>
    </div>);
}

export default Tag;