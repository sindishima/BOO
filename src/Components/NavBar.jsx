import React from 'react';
import {Link} from 'react-router-dom'

function NavBar(){
    return(
        <div class="navigationBar">
            {/* <ul> */}
                <div className="pnav">
                    <div className="nav">
                    <Link to="/"> Products </Link>
                    </div>
                    <div className="nav">
                    <Link to="/employee"> Employee </Link>
                    </div>
                    <div className="nav" >
                    <Link to="/bills"> Bills </Link>
                    </div>
                    <div className="nav">
                    <Link to="/inventory"> Inventory </Link>
                    </div>
                </div>
                {/* </ul> */}
            </div>
    )
}

export default NavBar;