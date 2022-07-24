import React from "react";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from "axios";
import {SearchRounded} from "@mui/icons-material"
import {Logout} from "@mui/icons-material"
import {useHistory} from 'react-router-dom'

import './Components/cssStyles/Inventory.css'


// const dateFilterParams = {
//     comparator: function (filterLocalDateAtMidnight, cellValue) {
//         var dateAsString = cellValue;
//         if (dateAsString == null) return -1;
//         var dateParts = dateAsString.split('-');
//         var cellDate = new Date(
//         Number(dateParts[2]),
//         Number(dateParts[1]) - 1,
//         Number(dateParts[0])
//         );
//         if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
//             return 0;
//         }
//         if (cellDate < filterLocalDateAtMidnight) {
//             return -1;
//         }
//         if (cellDate > filterLocalDateAtMidnight) {
//             return 1;
//         }
//     },
//     browserDatePicker: true,
// };

function Inventory(){
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [productName, setProductName]=useState('')
    const [categoryName, setCategoryName]=useState('');

        //FILTER BILLS
        const [inventory, setInventory]=useState("")
        
    
        const setData=()=>{
            if (startDate !== '' && endDate !== '' && startDate > endDate) {
                alert("Start Date should be before End Date")
                setEndDate('')
            } 
            else { 
                axios.get(`http://localhost:8080//inventory/query?productName=${productName}&categoryName=${categoryName}&from=${startDate}&to=${endDate}`).then(rs=>{
                            setInventory(rs.data)
                            console.log("dd",rs.data)
            })}
        }

        const setData1=()=>{
            if (startDate !== '' && endDate !== '' && startDate > endDate) {
                alert("Start Date should be before End Date")
                setEndDate('')
            } 
            else { 
                axios.get(`http://localhost:8080//inventory/query?productName=${productName}`).then(rs=>{
                            setInventory(rs.data)
                            console.log("D searched",rs.data)
            })}
        }
    
        useEffect(() => {
            setData()
            setData1()
            },[])


            const setCafeteriaData=()=>{
                    axios.get(`http://localhost:8080//inventory/query?productName=${categoryName}`).then(rs=>{
                                setInventory(rs.data)
                                console.log("D cafeteria",rs.data)
                })
            }
        
            useEffect(() => {
                setData()
                setData1()
                },[])


    const columns = [
        { headerName: "Product no.", field: "product_Id" },
        { headerName: "Product", field: "name"},
        { headerName: "Category", field: "category" },
        { headerName: "Price", field: "price" },
        { headerName: "Amount", field: "amount" }
    ];

    const l=['dd','sa','ie']


    const history=useHistory('')
    return(
        <div className="inventory">
            <Header1 />
            <div className="fullpanelInventory">
            <div className="profnavInventory">
                <Profile />  
                <NavBar />
            </div>
            <div className="panelInventory">
                <div className="buttonsInventory">
                {/* <button className="cafeteriaButtonInventory" onClick={setCafeteriaData}>Cafeteria</button> */}
                <div class="dropdown">
                        <button class="bb">Dropdown</button>
                    {l.map((n)=>{
                        console.log(n);
                        <div class="dropdown-content">
                            <a href="#">li</a>
                        </div>
                        })}
                </div>

                <button className="cantinaButtonInventory">Cantina</button>
                </div>
                <header className="headerr">
                <div className="inputBox">
                    <SearchRounded onClick={setData1}/>
                    <div><input type="text" value={productName} placeholder="               Search" className="search" onChange={(e) => setProductName(e.target.value)}/></div>
                </div>
                <button className="logoutbtn" onClick={() => history.push('/login')}><Logout /></button>
                </header>
                <div className='fromToinputs1'>
                    From : <input className='fromInput1' type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    To : <input className='toInput1' type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    <button className="setDataBtn" onClick={setData}>Find</button>
                </div>
                <div className="ag-theme-alpine" >
            <AgGridReact
                rowData={inventory}
                columnDefs={columns}
            />
                </div>
        </div>
        </div>
        </div>
    );
}


export default Inventory;