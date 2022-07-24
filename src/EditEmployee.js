import React from "react";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar";
import employee from "./images/employee.png"
import { Link, Redirect, useHistory } from "react-router-dom";
import goBackIcon from './Components/product/img/goBackIcon.png'
import { useEffect } from "react";
import EmployeeList from "./Components/emloyee/EmployeeList";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import useNavigate from 'react-router-dom'

import './Components/cssStyles/EditEmployee.css'


function EditEmployee(props){
    const history = useHistory();

    const {id} =useParams()
    const [username, setName] = useState("");
    const [password, setPassword]=useState("")
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [lo, setLo]=useState(false)
    const [secPassword, setSecPassword]=useState("")


    //GET A EMPLOYEE BY ID
    useEffect(()=>{
        if(lo===false){
            if(id){ 
            axios.get(`http://localhost:8080/seller/${id}`).then(rs=>{
                console.log("Employee with desired id",rs.data)
                setLo(true)
                setName(rs.data.username)
                setPassword(rs.data.password)
                setImage(rs.data.image)
                setSecPassword(rs.data.password)
        })
        .catch(err => {
            console.log(err);
        })
    }}},[id]);


    const handleSubmit=(e)=>{
        e.preventDefault();
        const role="SELLER"
        const updatedEmployee={username, password, image, role}
        console.log("updated employee", updatedEmployee);
        axios.put(`http://localhost:8080/seller/${props.match.params.id}`, updatedEmployee).then(res=>{
            console.log("upd Product ",res.data)
        })
        history.push("/employee")
    }

    
    const handleSubmit1=(e)=>{
        e.preventDefault();
        axios.delete(`http://localhost:8080/seller/${props.match.params.id}`).then(res=>{
            console.log("delete Product ",res.data)
        })
        history.push('/employee')
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
        <div className="editemp">
            <Header1 />
            <div className="fulpanel">
            <div className="inav">
                <Profile />
                <NavBar />
            </div>
        <div className="paanell">
            <div className="smallpanell">
                <Link to="/employee"><img src={goBackIcon} alt="" className="goBackIconImage4" /></Link>
                <form onSubmit={handleSubmit}>
                        <div className="employeeImg12">
                        <div className="innerImageEmpl12">
                            <img src={image} alt="" style={{width: '105px', marginLeft:"37px", marginTop:"11px"}} />
                        </div>
                        </div>
                <label htmlFor="file-upload12" className="addimageFile12"> Add Image
                        <input type="file" value={fileName} onChange={uploadImage} name='file' id="file-upload12" className="uploadImageText12"/>
                </label>
                </form>
                <div className="bottomPanel2">
                    <form onSubmit={handleSubmit}>
                        <div className="threeInputs">
                        <label htmlFor="">Username</label><br/>
                        <input type="text" className="username" value={username} pattern="[a-zA-Z\s]*" onChange={(event) => setName(event.target.value)} /><br />
                        <label htmlFor="">Password</label><br />
                        <input type="password" className="pass" value={password} onChange={(event) => setPassword(event.target.value)}/><br />
                        <label htmlFor="" >Confirm Password</label><br />
                        <input type="password" className="confirmPass" value={secPassword} onChange={(event) => setSecPassword(event.target.value)}/> 
                        <br />
                        </div>
                        <div className="btnn">
                            <button type="submit" className="bluee">Save Changes</button>
                            <button type="submit" className="redd" onClick={handleSubmit1}>Remove Employee</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default EditEmployee;