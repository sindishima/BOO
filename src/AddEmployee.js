import React, { useRef } from "react";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import goBackIcon from './Components/product/img/goBackIcon.png';
import './Components/cssStyles/AddEmployee.css';
import EmployeeList from "./Components/emloyee/EmployeeList";
import axios from "axios";


function AddEmployee(){
    const history = useHistory("")
    // const [id, setItemId] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [employee, setEmployee]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault();
        const newEmployee={username, image, password}
        console.log(newEmployee);
        axios.post("http://localhost:8080/seller", newEmployee).then(res=>{
            console.log("New Employee ",res.data)
            setEmployee(res.data)
        })
        history.push("/employee")
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
        <div className="editemp1">
            <Header1 />
            <div className="fulpanel1">
            <div className="inav1">
                <Profile />
                <NavBar />
            </div>
        <div className="paanell1">
            <div className="smallpanell1">
                <Link to="/employee"><img src={goBackIcon} alt="" className="goBackIconImage3" /></Link>
                <form onSubmit={handleSubmit}>
                        <div className="employeeImg1">
                        <div className="innerImageEmpl">
                            <img src={image} alt="" style={{width: '120px', marginLeft:"30px", marginTop:"10px"}} />
                        </div>
                        </div>
                    <label htmlFor="file-upload" className="addimageFile"> Add Image
                        <input type="file" value={fileName} onChange={uploadImage} name='file' id="file-upload" className="uploadImageText"/>
                    </label>
                </form>
                <div className="bottomPanel21">
                    <form onSubmit={handleSubmit}>
                        <div className="threeInputs1">
                        <label htmlFor="">Username</label><br />
                        <input type="text" className="username1" value={username} pattern="[a-zA-Z\s]*" onChange={(event) => setUsername(event.target.value)}/><br />
                        <label htmlFor="">Password</label><br />
                        <input type="password" className="pass1" value={password} onChange={(event) => setPassword(event.target.value)}/><br />
                        <label htmlFor="" >Confirm Password</label><br />
                        <input type="password" className="confirmPass1" value={rePassword} onChange={(event) => setRePassword(event.target.value)}/> 
                        <br />
                        </div>
                        <div className="btnn">
                            {/* <Link to="/employee"><button type="submit" className="bluee1">Save Changes</button></Link>
                            <Link to="/employee"><button type="submit" className="redd1">Remove Employee</button></Link> */}
                            <button type="submit" className="redd1">Add Employee</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default AddEmployee;