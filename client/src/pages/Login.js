import React, { useState } from "react";
import axios from "axios";
import "./css/Login.css";

function Login({ setAccount }) {
    const [user, setUser] = useState({
        name: "",
        password: "",
    });
    const [prompt, setPrompt] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const login = () => {
        axios
            .post(process.env.REACT_APP_API_URL + "/api/users/login", user)
            .then((res) => {
                if (res.data.message === "login unsuccessful")
                    setPrompt("User credentials invalid, please try again.");
                else {
                    setAccount(res.data.user);
                    window.localStorage.setItem(
                        "account",
                        JSON.stringify(res.data.user)
                    );
                    window.localStorage.setItem("token", res.data.token);
                }
            })
            .catch((err) => {
                console.error(err);
                setPrompt("Failed to login.");
            });
    };

    return (
        <main className="Login-Wrapper">
            <h3>LOGIN</h3>
            <div>
                <form action="#" autoComplete="off">
                    <input
                        type="text"
                        id="sign-in-email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="email"
                    />
                    <input
                        type="password"
                        id="sign-in-pass"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="password"
                    />
                    <button type="button" id="sign-in-button" onClick={login}>
                        Login
                    </button>
                </form>
            </div>
            <p id="loginPrompt">{prompt}</p>
        </main>
    );
}

export default Login;
