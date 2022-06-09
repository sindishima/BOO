import React from "react";
import {SearchRounded} from "@mui/icons-material"
import {Logout} from "@mui/icons-material"

import '../App.css'




function Header() {
    // useEffect(() => {
    //   const toggleIcon = document.querySelector(".toggleMenu");
    //   toggleIcon.addEventListener("click", () => {
    //     document.querySelector(".rightMenu").classList.toggle("active");
    //   });
    // }, []);
    return (
        <header className="headerr">
            <div className="inputBox">
                <SearchRounded className="searchIcon"/>
                <div><input type="text" placeholder="               Search" className="search"/></div>
            </div>
            <Logout className="logout"/>
        </header>
    );
}

export default Header;
