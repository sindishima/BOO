import React from "react";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar";
import burger from "./images/burger.png"
import { Link, useHistory } from "react-router-dom";
import goBackIcon from './Components/product/img/goBackIcon.png'
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import './Components/cssStyles/AddProduct.css'


function AddProduct(props){
    const history=useHistory("")

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const {id} =useParams()
    const [loading, setLoading] = useState(false);


    //FORM DETAILS
    const handleSubmit=(e)=>{
        e.preventDefault();
        const newProduct={amount, name, description, price, image}
        console.log("New peoduct", newProduct);
        console.log(props)
        if(id){ 
        axios.post(`http://localhost:8080/product/category/${props.match.params.id}`, newProduct).then(res=>{
            console.log("new Product ",res.data)
        })}
        history.push("/product")
    }
    
    const uploadImage = async e =>{
        let files=e.target.files[0];
        const data=new FormData();
        data.append('file', files);
        data.append('upload_preset', 'mc8qo1be');
        setLoading(true);
        const res = await fetch("https://api.cloudinary.com/v1_1/drntvjjxh/image/upload",
        {
            method:'POST',
            body: data
        })
        const file=await res.json();
        setImage(file.secure_url);
        setLoading(false);
        }

        const fileName = e =>{
            let files=e.target.files[0];
        }


    return(
        <div className="editprd1">
            <Header1 />
            <div className="fupanel1">
            <div className="profilenav1">
                <Profile />
                <NavBar />
            </div>
        <div className="ppanell1">
            <div className="smallpanel1">
                <Link to="/product"><img src={goBackIcon} alt="" className="goBackIconImage3" /></Link>
                <form onSubmit={handleSubmit}>
                        <div className="productImage1">
                        <div className="innerImageProduct">
                            <img src={image} alt="" style={{width: '105px', marginLeft:"37px", marginTop:"11px"}} />
                        </div>
                        </div>
                <label htmlFor="file-upload" className="addimageFile1"> Add Image
                        <input type="file" value={fileName} onChange={uploadImage} name='file' id="file-upload" className="uploadImageText1"/>
                </label>
                </form>
                <div className="bottomPanell1">
                    <form onSubmit={handleSubmit}>
                        <div className="name11">
                        <label htmlFor="" className="name21">Name</label><br />
                        <input type="text" pattern="[a-zA-Z\s]*" className="name111" value={name} onChange={(event) => setName(event.target.value)}/><br />
                        </div>
                        <div className="amount11">
                        <label htmlFor="" className="amount21">Amount</label><br />
                        <input type="number" min="0" className="amount111" value={amount} onChange={(event) => setAmount(event.target.value)}/><br />
                        </div>
                        <div className="description11">
                        <label htmlFor="" className="description21">Description</label><br />
                        <input type="textarea" pattern="[a-zA-Z\s]*" className="description111" value={description} onChange={(event) => setDescription(event.target.value)} /><br />
                        </div>
                        <div className="price11">
                        <label htmlFor="" className="price21" >Price</label><br />
                        <input type="number" min="1" className="price111" value={price} onChange={(event) => setPrice(event.target.value)}/> L 
                        </div>
                        <div className="buttonn6">
                            <button type="submit" className="blue1">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default AddProduct;