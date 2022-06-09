import React from "react";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Employees from "./Components/emloyee/Employees";
import EmployeeList from "./Components/emloyee/EmployeeList"

import './Employee.css'


function Employee(){
    return(
        <div className="employee">
            <Header1 />
            <div className="fpanel">
            <div className="imgnav">
                <Profile />
                <NavBar />
            </div>
            <div className="panell">
                <Header />
            <div className="employeeList">
            {EmployeeList.map(data => ( 
                <div key={data.id}>
                        <Employees
                            name={data.name}
                            img={data.image}
                            color={data.color}
                        />
                </div>
                ))
            }
            </div>
        </div>
        </div>
        </div>
    );
}

export default Employee;