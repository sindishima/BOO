import React from "react";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar";
import burger from "./images/burger.png"
import { Link, useHistory, useParams } from "react-router-dom";
import goBackIcon from './Components/product/img/goBackIcon.png'
import { useState } from "react";
import './Components/cssStyles/EditProduct.css'
import axios from "axios";
// import { useParams } from "react-router-dom";
import { useEffect } from "react";


function EditProduct(props){
    const history=useHistory("")

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const {id} =useParams()
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [lo, setLo]=useState(false)



    //GET A PRODUCT BY ID
    useEffect(()=>{
        if(lo===false){
            if(id){ 
            axios.get(`http://localhost:8080/product/${id}`).then(rs=>{
                console.log("Product with desired id",rs.data)
                setLo(true)
                setName(rs.data.name)
                setAmount(rs.data.amount)
                setDescription(rs.data.description)
                setPrice(rs.data.price)
                setImage(rs.data.image)
        })
        .catch(err => {
            console.log(err);
        })
    }}},[id]);


    const handleSubmit=(e)=>{
        e.preventDefault();
        const updatedProduct={amount, name, description, id, price, image}
        console.log("updated peoduct", updatedProduct);
        axios.put(`http://localhost:8080/product/${props.match.params.id}`, updatedProduct).then(res=>{
            console.log("upd Product ",res.data)
        })
        history.push("/product")
    }


    const handleSubmit1=(e)=>{
        e.preventDefault();
        axios.delete(`http://localhost:8080/product/${props.match.params.id}`).then(res=>{
            console.log("delete Product ",res.data)
        })
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
            let files=e.target.files[0].name;
        }

    return(
        <div className="editprd">
            <Header1 />
            <div className="fupanel">
            <div className="profilenav">
                <Profile />
                <NavBar />
            </div>
        <div className="ppanell">
            <div className="smallpanel">
                <Link to="/product"><img src={goBackIcon} alt="" className="goBackIconImage" /></Link>
                <form onSubmit={handleSubmit}>
                        <div className="productImage1">
                        <div className="innerImageProduct">
                            <img src={image} alt="" style={{width: '105px', marginLeft:"37px", marginTop:"11px"}} />
                        </div>
                        </div>
                <label htmlFor="file-upload1" className="addimageFile1"> Add Image
                        <input type="file" value={fileName} onChange={uploadImage} name='file' id="file-upload1" className="uploadImageText1"/>
                </label>
                </form>
                <div className="bottomPanell">
                    <form onSubmit={handleSubmit}>
                        <div className="name1">
                        <label htmlFor="" className="name2">Name</label><br />
                        <input type="text" pattern="[a-zA-Z\s]*" className="name" value={name} onChange={(event) => setName(event.target.value)}/><br />
                        </div>
                        <div className="amount1">
                        <label htmlFor="" className="amount2">Amount</label><br />
                        <input type="number" min="0" className="amount" value={amount} onChange={(event) => setAmount(event.target.value)} /><br />
                        </div>
                        <div className="description1">
                        <label htmlFor="" className="description2">Description</label><br />
                        <input type="textarea" pattern="[a-zA-Z\s]*" className="description" value={description} onChange={(event) => setDescription(event.target.value)}/><br /><br />
                        </div>
                        <div className="price1">
                        <label htmlFor="" className="price2" >Price</label><br />
                        <input type="number" min="1" className="price" value={price} onChange={(event) => setPrice(event.target.value)} /> L 
                        <br />
                        </div>
                        <div className="buttonn">
                            <button type="submit" className="blue">Save Changes</button>
                            <button type="submit" className="red" onClick={handleSubmit1}>Remove Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default EditProduct;