import "./css/Tag.css";

import { BiX } from "react-icons/bi";

import axios from "axios";

function Tag(props) {
    var string_to_color = function (str) {
        var hash = 0;

        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        var color = "#";
        // eslint-disable-next-line
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xff;
            color += ("00" + value.toString(16)).substr(-2);
        }

        return color;
    };

    return (
        <div
            className="Tag-Wrapper"
            style={{ background: string_to_color(props.name) }}
        >
            {props.name && (
                <a
                    onClick={() =>
                        props.updateSearch
                            ? props.updateSearch(props.name)
                            : null
                    }
                >
                    {" "}
                    {props.name}{" "}
                </a>
            )}
            {props.rm && (
                <a
                    onClick={() => {
                        props.rm(props.tag);
                    }}
                >
                    <BiX />
                </a>
            )}
        </div>
    );
}

export default Tag;
