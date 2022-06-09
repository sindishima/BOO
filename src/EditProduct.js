import React from "react";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar";
import burger from "./burger.png"
import './EditProduct.css'



function Bill(){
    return(
        <div className="employee">
            <Header1 />
            <div className="fpanel">
            <div className="imgnav">
                <Profile />
                <NavBar />
            </div>
        <div className="panell">
            <div className="smallpanel">
                <img src={burger} alt="" className="burgerImg"/>
                <a href="#" className="updatePhoto">Update Photo</a>
                <div className="bottomPanel">
                    <form action="">
                        <label htmlFor="">Name</label><br />
                        <input type="text" className="name"/><br />
                        <label htmlFor="">Amount</label><br />
                        <input type="number" className="amount" /><br />
                        <label htmlFor="">Description</label><br />
                        <input type="textarea" className="description" /><br /><br />
                        <label htmlFor="" >Price</label><br />
                        <input type="number" className="price" /> L 
                        <br />
                        <div className="btn">
                            <button type="submit">Save Changes</button>
                            <button type="submit" className="red">Remove Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Bill;