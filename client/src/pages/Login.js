import React,{useState} from 'react'
import axios from 'axios';

function Login() {
    const [user, setUser] = useState({
        name: "",
        password: ""
    })

    const handleChange = e => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const login = () => {
        axios.post("http://localhost:8080/api/users/login", user)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
    <main className="Login-Wrapper">
        <p>Login</p>
        <div>
            <form action="#" autoComplete="off">
                <input type="text" id="sign-in-email" name="email" value={user.email} onChange={handleChange} placeholder="email"/>
                <input type="password" id="sign-in-pass" name="password" value={user.password} onChange={handleChange} placeholder="password"/>
                <button type="button" onClick={login}>
                    Login
                </button>
            </form>
        </div>
    </main>);
}

export default Login;