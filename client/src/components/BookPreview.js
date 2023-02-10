function BookPreview(props) {
    return (
    <div className="BookPreview-Wrapper">
        <div className="CoverImage-Wrapper">
            <img src={"https://images.isbndb.com/covers/79/81/" + props.id + ".jpg"} width="128px"></img>
            {
                // TODO: Move width attribute into styling
                // TODO: Test/check if correct subpath for all covers
                //       If not send whole path as prop
            }
        </div>
        <div className="MetaData-Wrapper">
            <p><b>TITLE:</b> {props.title}</p>
            {
                props.desc ? <><hr/><p><b>DESCRIPTION:</b> {props.desc}</p></> : <></>
                // COMMENT: This field does not necessarily exist
            }
            <hr/>
            <p><b>ISBN13:</b> {props.id}</p>
            {
                props.tags ? <><hr/><p><b>TAGS:</b></p></> : <></>
                // TODO: Map all tags from response to <Tag\>-tag
            }
        </div>
    </div>);
}

export default BookPreview;