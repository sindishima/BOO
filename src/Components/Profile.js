import React from "react";
import { Link , BrowserRouter, Route} from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from "axios";

function Profile(props) {
    // const {username, image, id, password, role} = props;

    const [admin, setAdmin]=useState([])
    const [loadd, setLoadd]=useState(false)

    const history = useHistory("")

    //GET THE ADMIN
    useEffect(()=>{
        if(loadd===false){
            axios.get("http://localhost:8080/admin").then(rs=>{
                console.log("AdmiNN",rs.data)
                setAdmin(rs.data)
                setLoadd(true)
        })
        .catch(err => {
            console.log(err);
        })
    }
},[admin, loadd]);

    return (
            <div className="profile" id={admin.id} >
                <img src={admin.image} alt="" className="myProfilePhoto"/>
                <h3>{admin.username}</h3>
                <Link to="/edit">Edit</Link>
            </div>
    );
}

export default Profile;
