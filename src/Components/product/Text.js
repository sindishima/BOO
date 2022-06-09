import React, { useState } from 'react'
import '../../App.css'


function Text(){ 
    const[line, setLine]=useState(false);

    return (
        <div className={`link ${line ? "active" : ""}`}
        onClick={() => setLine(!setLine)}>
        <ul>
            <h3>Cafeteria</h3>
                <a href="#" className="cofe">Chips </a>
                <a href="#" className="cofe">Sweets </a>
                <a href="#" className="cofe">Drinks </a>
                <a href="#" className="cofe">Hots </a>
        </ul>
    </div>
    );
};

export default Text