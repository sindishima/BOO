import React, { useState } from 'react'
import '../cssStyles/App.css'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Text({name, isActive}){ 
    return (
        <div className={`cofe ${isActive ? `active` : ``}`}>
            {/* <Link to={`/addProduct/${id}`} > */}
                <h4>{name}</h4>
            {/* </Link> */}
        </div>
    );
};


export default Text