import React from "react";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar";
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {Logout} from "@mui/icons-material";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import './Components/cssStyles/Bill.css'
import { toContainElement } from "@testing-library/jest-dom/dist/matchers";



function Bill(props){
    const history = useHistory();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    
    //FILTER BILLS
    const [bill, setBill]=useState(
        ()=>{
            axios.get(`http://localhost:8080/bill/query?from=${startDate}&to=${endDate}`).then(rs=>{
                    setBill(rs.data)
                    console.log("initial data",rs.data)
    })
    })
    

    const setData=()=>{
        if (startDate !== '' && endDate !== '' && startDate > endDate) {
            alert("Start Date should be before End Date")
            setEndDate('')
        } 
        else { 
                    axios.get(`http://localhost:8080/bill/query?from=${startDate}&to=${endDate}`).then(rs=>{
                        setBill(rs.data)
                        console.log("Data",rs.data)
        })}
    }

    useEffect(() => {
        setData()
        },[])

//     const setData = () =>{
//         if (startDate !== '' && endDate !== '' && startDate > endDate) {
//             alert("Start Date should be before End Date")
//             setEndDate('')
//         } 
//         else { 
//         axios.get(`http://localhost:8080/bill/query?from=${startDate}&to=${endDate}`).then(rs=>{
//             console.log("Filtered bills",rs.data)
//             console.log("Objects",obj)
//             console.log("Id list",id)
//             let cnt=0
//             id.forEach((n) => { 
//                 console.log("wanted id", n)
//                 let total=0
//                 axios.get(`http://localhost:8080/bill/${n}/products`).then(rs=>{
//                     console.log("Each bill product",rs.data)
//                     rs.data.forEach((m)=>{
//                         console.log("Data", m)
//                         console.log("Price", m.price)
//                         console.log("Amount", m.amount)
//                         console.log("New total", (m.price)*(m.amount))
//                         const newTotal=(m.price)*(m.amount)
//                         total=total+newTotal;
//                         console.log("All tot", total)
//                     })
//                     setPrice(price=>[...price, total])
//                 })
//                 const o={"id": id[cnt], "createdTime": createdTime[cnt], "price": price[cnt]}
//                 cnt=cnt+1
//                 console.log("o", o)
//                 setObj(obj=>[...obj, o])
//                 console.log("IIobj", obj)
//             })
//     })
// }}


const [id, setId]=useState([])
const [rowIndexx, setRowIndexx]=useState()


const columnDefs= [
    { field:'id', cellRenderer:(params)=>
    <div>  
                <Link to={`/billDetailedView/${id}/${rowIndexx}`}>
                    {params.data.id}
                </Link>
    </div>,  },
    { field: 'createdTime', sortable:'true'},
    { field: 'totalPrice', sortable: 'true' }
]


// const [selectedRow, setSelectedRow]=useState(true)

function onSelectionChanged (event){
    console.log("Selected row id",event.api)
    setId(event.api.getSelectedRows()[0].id)
    // history.push=(`/billDetailedView/${id}/${rowIndexx}`)
    // setSelectedRow(false)
}


    return(
        <div className="bill">
            <Header1 />
            <div className="fullpanelBill">
            <div className="profnavBill">
                <Profile />
                <NavBar />
            </div>
            <div className="panelBill">
            <div className="dataRange">
            <button className="logoutButtonBills" onClick={() => history.push('/login')}><Logout /></button>
                <div className='fromToinputs'>
                    <div className="fff">
                    From : <input className='fromInput' type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    To : <input className='toInput' type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>
                    <button className="setDataBtn" onClick={setData}>Find</button>
                </div>
                <div className="ag-theme-alpine" >
                    {/* <Link to={`/billDetailedView/${id}/${rowIndexx}`} > */}
                        <AgGridReact
                            pagination
                            paginationPageSize={10}
                            rowData={bill}
                            columnDefs={columnDefs}
                            rowSelection="single"
                            onSelectionChanged={onSelectionChanged}
                            onRowClicked={(e) => {
                                console.log("row clicked", e.rowIndex)
                                setRowIndexx(e.rowIndex+1)
                        }}
                            >
                        </AgGridReact>
                        {/* </Link> */}
                </div>
            </div>
            </div>
            </div>
        </div>
    );
}

export default Bill;



