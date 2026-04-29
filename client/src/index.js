import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import App from "./App";
//import reportWebVitals from './reportWebVitals';

axios.interceptors.response.use(
    (res) => res,
    (err) => {
        if (
            err.response?.status === 401 &&
            err.response?.data?.error === "USER_NOT_FOUND"
        ) {
            localStorage.removeItem("token");
            localStorage.removeItem("account");
            window.location.reload();
        }
        return Promise.reject(err);
    }
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
