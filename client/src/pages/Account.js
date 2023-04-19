import React, {useEffect} from 'react';
import HeaderWithoutSearch from '../components/headers/HeaderWithoutSearch';
import './css/Book.css'

function Account(props) {
    return (
    <>
        <HeaderWithoutSearch/>
        {
        props.user && 
        <>
            {
             
            <main class="Account-Wrapper">
                <div class="Information">
                   <div class="Photo"></div> 
                   <h1>Profilsida för {props.user.name}</h1>
                </div>

               <div class="Reading-list">
                   <h1>Läslista för {props.user.name}</h1>
                </div>
                
                <div class="Loan-list">
                   <h1>Mina Lån</h1>
                </div>
                
            </main>   
            /* 
            TODO:
            <h2>Lånade böcker</h2>
            <h2>Favoritma <div class="information">
                <h1>Profilsida för {props.user.name}</h1>
             </div>   rkerade böcker</h2>
            <h2>Inställningar</h2>
            */
            }
        </>
        }
    </>);
}

export default Account;