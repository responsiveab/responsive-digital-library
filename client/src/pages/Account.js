import React, {useEffect} from 'react';

function Account(props) {
    return (
    <>
        {
        props.user && 
        <>
            <h1>Profilsida för {props.user.name}</h1>
            {
            /* 
            TODO:
            <h2>Lånade böcker</h2>
            <h2>Favoritmarkerade böcker</h2>
            <h2>Inställningar</h2>
            */
            }
        </>
        }
    </>);
}

export default Account;