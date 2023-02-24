import './css/Tag.css';

import {
    Link
} from "react-router-dom";

function Tag(props) {

    var string_to_color = function(str) {
        var hash = 0;

        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        var color = '#';
        for (var i = 0; i < 3; i++) {
          var value = (hash >> (i * 8)) & 0xFF;
          color += ('00' + value.toString(16)).substr(-2);
        }

        return color;
    }

    return (
    <div className='Tag-Wrapper' style={{ background: string_to_color(props.content) }}>
        <Link to={"../search/tag/" + props.content}>{props.content}</Link>
    </div>);
}

export default Tag;