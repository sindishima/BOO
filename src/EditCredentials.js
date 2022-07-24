import React from "react";
import Header1 from "./Components/Header1";
import editcred from "./images/editcred.png"
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import goBackIcon from './Components/product/img/goBackIcon.png'

import './Components/cssStyles/EditCredentials.css'


const color='white';

function EditCredentials(){
    const history = useHistory();

    const [username, setName] = useState("");
    const [password, setPassword]=useState("")
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [secPassword, setSecPassword]=useState("")


    const [admin, setAdmin]=useState(
        ()=>{
            axios.get("http://localhost:8080/admin").then(rs=>{
                console.log("Adminn",rs.data)
                setAdmin(rs.data)
                setImage(rs.data.image)
                setName(rs.data.username)
                setPassword(rs.data.password)
                setSecPassword(rs.data.password)
        })
        }
    )

    const handleSubmit=(e)=>{
        e.preventDefault();
        const role="ADMIN"
        const updatedAdmin={username, password, image, role}
        console.log("updated admin", updatedAdmin);
        axios.post("http://localhost:8080/admin", updatedAdmin).then(res=>{
            console.log("Updated Admin ", res.data)
            setAdmin(res.data)
            setImage(res.data.image)
            setName(res.data.username)
            setPassword(res.data.password)
        })
        history.push("/login")
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
        <div className="editcredentials">
            <Header1 />
            <div className="smalllpanel">
                <div className="topPanel">
                <Link to="/product"><img src={goBackIcon} alt="" className="goBackIconImage3" /></Link>
                <form onSubmit={handleSubmit}>
                        <div className="editcredImg1">
                            <img src={image} alt="" style={{width: '105px', marginLeft:"37px", marginTop:"11px"}} />
                        </div>
                <label htmlFor="file-upload3" className="editcredText"> Edit Photo
                        <input type="file" value={fileName} onChange={uploadImage} name='file' id="file-upload3" className="uploadImageText3"/>
                </label>
                </form>
                </div>
                <div className="lowwPanel">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="" style={{color: color}} className="usnText" >Username</label><br />
                        <input type="text" className="usname" value={username} pattern="[a-zA-Z\s]*" onChange={(event) => setName(event.target.value)}/><br />
                        <label htmlFor="" style={{color: color}} className="passwText" >Password</label><br />
                        <input type="password" className="pasw" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
                        <label htmlFor="" style={{color: color}} className="rewriteText" >Rewrite Password</label><br />
                        <input type="password" className="passww" value={secPassword} onChange={(event) => setSecPassword(event.target.value)}/><br />
                        <button type="submit" className="savebtn">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCredentials;