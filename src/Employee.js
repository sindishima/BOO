import React from "react";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar";
import Header1 from './Components/Header1';
import Header from './Components/Header';
import Employees from "./Components/emloyee/Employees";
import EmployeeList from "./Components/emloyee/EmployeeList";
import { Link } from "react-router-dom";
import addIcon from './Components/emloyee/AddIcon.png'
import { useState } from "react";
import {SearchRounded} from "@mui/icons-material"
import {Logout} from "@mui/icons-material"
import { useEffect } from "react";
import {useHistory} from 'react-router-dom'
import axios from "axios";

import './Components/cssStyles/Employee.css'


function Employee(){
    const history = useHistory();

    const [searchInput, setSearchInput]=useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = employeeList.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
            console.log(filteredData);
            console.log(searchInput.length);
        }
        else{
            setFilteredResults(employeeList);
        }
    }


    const [employeeList, setEmployeeList]=useState([])
    const [l, setL]=useState(false);
    
    useEffect(()=>{
        if(l===false){ 
            axios.get("http://localhost:8080/seller").then(r=>{
                console.log("Products cafeteria",r.data)
                setEmployeeList(r.data)
                setL(true)
            })
            .catch(err => {
                console.log(err);
            })
        }
    },[employeeList, l]);


    // const [employee, setEmployee]=useState([]);

    // useEffect(() => {
    //     const activeEmployee = document.querySelector(".employeeList").querySelectorAll(".empl");

    //     function setEmployeeActive() {
    //         activeEmployee.forEach((n) => n.classList.remove("active"));
    //         this.classList.add("active");
    //         console.log(activeEmployee);
    //     }

    //     activeEmployee.forEach((n) => n.addEventListener("click", setEmployeeActive));
    // },[employee]);
        

    // const setData = () =>{
    //         axios.get("http://localhost:8080/seller").then(r=>{
    //         console.log("initial",r.data)
    //         setEmployee(r.data)
    // })
    // }

    return(
        <div className="employee">
            <Header1 />
            <div className="fpanel">
            <div className="imgnav">
                <Profile />
                <NavBar />
            </div>
            <div className="panell">

            <header className="headerr">
                <div className="inputBox">
                    <SearchRounded />
                    <div><input type="text" value={searchInput} placeholder="               Search" className="search" onChange={(e) => searchItems(e.target.value)}/></div>
                </div>
                <button className="logoutbtn" onClick={() => history.push('/login')}><Logout /></button>
            </header>

            <div className="employeeList" >
                {searchInput.length > 0 ? (
                    filteredResults.map(data => ( 
                            <div key={data.id}>
                                 {/* onClick={()=>setData(data.id)}> */}
                            <Employees
                                id={data.id}
                                username={data.username}
                                image={data.image}
                                color={data.color}
                            />
                            </div>
                        ))
                ) : (
                employeeList.map(data => ( 
                    <div key={data.id} >
                        <Employees
                            id={data.id}
                            username={data.username}
                            password={data.password}
                            image={data.image}
                        />
                    </div>
                    ))
                )}
            <Link to="/addEmployee" className="addEmployee"> <img src={addIcon} alt="" className="addIconImage" /></Link>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Employee;