import React from "react";
import myProfilePhoto from "./product/img/myProfilePhoto.png";

import '../App.css'


function Header1() {
    return (
            <div className="profile">
                <div className="myImage"><img src={myProfilePhoto} alt="" className="epoka"/></div>
                <h3>Sindi Shima</h3>
                <a href="#">Edit</a>
            </div>
    );
}

export default Header1;
