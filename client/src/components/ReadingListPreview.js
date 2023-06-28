import React, { useEffect, useState } from "react";

import "./css/ReadingListPreview.css";
import Tag from "./Tag";

import { Link } from "react-router-dom";

function trimString(string) {
    var textLength = 200;
    var trimmedString = string.substr(0, textLength);
    if (string.length <= trimmedString.length) {
        trimmedString += " ";
    }
    trimmedString = trimmedString.substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    );
    if (string.length > trimmedString.length) {
        trimmedString += "...";
    }
    return trimmedString;
}

function ReadingListPreview(props) {
    // eslint-disable-next-line
    const [tags, setTags] = useState([]);

    const [count, setCount] = useState(5);

    useEffect(() => {
        setTags(props.taglis);
        // eslint-disable-next-line
    }, []);

    function increaseCount() {
        setCount(count + 5);
    }

    return (
        <>
            <div className="ReadingListPreview-Wrapper">
                {/* <div className="CoverImage-Wrapper">
            {
                <img src={props.img} width="128px" alt="cover"></img>
            }
        </div> */}
                <div className="MetaData-Wrapper">
                    <h3>
                        <Link to={"/books/" + props.id}>{props.title}</Link>
                    </h3>

                    {props.author ? (
                        <div className="metatext">
                            <p>{props.author}</p>
                        </div>
                    ) : (
                        <></>
                    )}
                    {
                        tags ? (
                            <div className="tags">
                                {tags.slice(0, count).map((tag) => (
                                    <Tag
                                        key={tag}
                                        content={tag}
                                        updateSearch={props.updateSearch}
                                    />
                                ))}
                                {count < tags.length && (
                                    <span className="Expander">
                                        <a href="#" onClick={increaseCount}>
                                            ...
                                        </a>
                                    </span>
                                )}
                            </div>
                        ) : (
                            <></>
                        )
                        // TODO: Hide some tags if there are too many
                    }
                    {props.body ? (
                        <div className="metatext">
                            <p>
                                <i>{trimString(props.body)}</i>
                            </p>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}

export default ReadingListPreview;
