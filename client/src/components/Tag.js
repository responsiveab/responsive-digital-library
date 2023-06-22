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

    function removeTag() {
        axios
            .delete(
                process.env.REACT_APP_API_URL +
                    "/api/tags/" +
                    props.isbn +
                    "/" +
                    props.content
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div
            className="Tag-Wrapper"
            style={{ background: string_to_color(props.content) }}
        >
            {props.content && (
                <a
                    onClick={() =>
                        props.inputUpdate
                            ? props.inputUpdate(props.content)
                            : null
                    }
                >
                    {" "}
                    {props.content}{" "}
                </a>
            )}
            {props.show_rm && (
                <a href="#" onClick={removeTag}>
                    <BiX />
                </a>
            )}
        </div>
    );
}

export default Tag;
