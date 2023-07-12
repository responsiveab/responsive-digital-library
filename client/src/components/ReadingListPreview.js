import React, { useEffect, useState } from "react";

import "./css/ReadingListPreview.css";
import Tag from "./Tag";

import { Link } from "react-router-dom";

function toText(html) {
    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || "";
}

function ReadingListPreview(props) {
    // eslint-disable-next-line
    const [tags, setTags] = useState([]);

    const [count, setCount] = useState(5);

    useEffect(() => {
        setTags(props.taglist);
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

                    {props.author && (
                        <div className="metatext">
                            <p>{props.author}</p>
                        </div>
                    )}
                    {
                        tags && (
                            <div className="tags">
                                {tags.slice(0, count).map((tag) => (
                                    <Tag
                                        key={tag}
                                        name={tag}
                                        updateSearch={props.updateSearch}
                                    />
                                ))}
                                {count < tags.length && (
                                    <span className="Expander">
                                        <a href="/" onClick={increaseCount}>
                                            ...
                                        </a>
                                    </span>
                                )}
                            </div>
                        )
                        // TODO: Hide some tags if there are too many
                    }
                </div>
                {props.body && (
                    <div className="bodytext">{toText(props.body)}</div>
                )}
            </div>
        </>
    );
}

export default ReadingListPreview;
