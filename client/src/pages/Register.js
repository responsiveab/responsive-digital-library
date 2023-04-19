import React , {useState} from 'react'

import axios from 'axios';
import './css/Register.css'

import {
    Link
} from "react-router-dom";

function Register() {

    const [user, setUser] = useState({
        name:"",
        email:"",
        password: ""
    })

    const handleChange = e => {
        const {name,value} = e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const register = () => {
        const {name,email,password} = user
        if (name && email && password) {
         axios.post("http://localhost:8080/api/users/register", user)
         .then(res=>console.log(res))
         .catch(err=>console.log(err))
        }
        else {
            alert("invalid input")
        }
    }

    return (
    <main className="Register-Wrapper">
        <p>Create account</p>
        <div>
            <form action="#">
                <input type="text" id="create-account-name" name="name" value={user.name} onChange={handleChange} placeholder="name"/>
                <input type="text" id="create-account-email" name="email" value={user.email} onChange={handleChange} placeholder="email"/>
                <input type="password" id="create-account-pass" name="password" value={user.password} onChange={handleChange} placeholder="password"/>
                <button type="button" id ="register-button" onClick={register}>
                    Register
                </button>
            </form>
        </div>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
    </main>);
}

export default Register;