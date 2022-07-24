import React from "react";
import Header1 from "./Components/Header1";
import login from "./images/login.png"
import Pages from "./Pages";
import { useHistory } from 'react-router-dom';



import './Components/cssStyles/Login.css'
import Product from "./Components/product/Product";
import { useState } from "react";
import axios from "axios";


const color='white';

function Login(){
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        const authenticatedPerson={username, password}
        console.log("Authenticated Admin", authenticatedPerson);
        axios.post("http://localhost:8080/authentication/admin", authenticatedPerson).then(res=>{
            console.log("Authenticated Product ",res.data)
        })
        history.push("/product")
    }

    return(
        <div className="login">
            <Header1 />
            <div className="smalpanel">
                <img src={login} alt="" className="loginImg"/>
                <h2 className="loginText">Login</h2>
                <div className="lowPanel" method="GET">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="" style={{color: color}} className="usernameText">Username</label><br />
                        <input type="text" className="usernameInput" value={username} onChange={(event) => setUsername(event.target.value)}/><br />
                        <label htmlFor="" style={{color: color}} className="passwordText">Password</label><br />
                        <input type="password" className="passwordInput" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
                        <button type="submit" className="signin" >Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;