import React, { useEffect, useState } from "react";

import "./css/LoanListPreview.css";
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

function LoanListPreview(props) {
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
            <div className="LoanListPreview-Wrapper">
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
                        tags ? (
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
                        ) : (
                            <></>
                        )
                        // TODO: Hide some tags if there are too many
                    }
                    {props.body && (
                        <div className="bodytext">{toText(props.body)}</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default LoanListPreview;
