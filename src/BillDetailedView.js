import React from "react";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {Logout} from "@mui/icons-material"
import { Link } from "react-router-dom";
import goBackIcon from './Components/product/img/goBackIcon.png'
import { useEffect } from "react";
import './Components/cssStyles/BillDetailedView.css'
import Table from './Components/Table'
import html2canvas from 'html2canvas';
import { useRef } from "react";

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';


function BillDetailedView(props){
    const {id} =useParams()
    const {rowIndexx}=useParams()
    const history = useHistory();
    
    function convertHMS(value) {
        return new Date(value).toLocaleString('al-tr',{timeZone:'GMT'})
    }

    const [createdTime, setCreatedTime]=useState(
        ()=>{
            axios.get(`http://localhost:8080/bill/${id}`).then(rs=>{
                    var dd = (rs.data.createdTime);
                    const date = convertHMS(dd)
                    setCreatedTime(date)
    })
    })

    const deleteBill=()=>{ 
            axios.delete(`http://localhost:8080/bill/${id}`).then(rs=>{
                    console.log("Delete bill",rs.data)
    })
    history.push('/bills')
    }

    const [billProducts, setBillProducts]=useState([])

    const [load, setLoad]=useState(false);
    const [totalAmount, setTotalAmount]=useState([])
    const [track, setTrack]=useState('')

    const getData=()=>{
        // e.preventDefault()
        setTrack('Start Request to Backend')
        setTimeout(()=>{   
        if(load===false){ 
            (async () => {
                const result = await axios(`http://localhost:8080/bill/${id}/products`);
                console.log("bill prd",result.data)
            result.data.forEach((n)=>{
                console.log("n",n.price)
                let tot=(n.amount)*(n.price)
                console.log("tot",tot)
                setTotalAmount(totalAmount=>[...totalAmount, tot])
                console.log("Total", totalAmount)
            })
            setBillProducts(result.data)
            setLoad(true)
            })()
            .catch(err => {
                console.log(err);
            })}
            setTrack('done')
        },2000);
        }

        useEffect(() => {
            getData()
                console.log("t", totalAmount)
            },[totalAmount])

    const findTotal=()=>{
        console.log("totalAm",totalAmount)
        const sum = totalAmount.reduce((total, currentValue) => total = total + currentValue, 0);
        console.log("sum",sum)
        return sum
    }

    const t=findTotal()

    
    function  printDocument() {
            // const doc = new jsPDF();
            const input = document.querySelector(".billView");
            // console.log(pdfTable)
            html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 32, 10);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            });
            // var html = htmlToPdfmake(pdfTable.innerHTML);
            // const documentDefinition = { content: html };
            // pdfMake.vfs = pdfFonts.pdfMake.vfs;
            // pdfMake.createPdf(documentDefinition).open();
    }
    
    return(
        <div className="billDetailedView">
            <Header1 />
            <div className="fullpanelBillDetailedView">
            <div className="profnavfullpanelBillDetailedView">
                <Profile />
                <NavBar />
            </div>
            <div className="panelBillDetailedView">
            <div className="head">
                <Link to="/bills"><img src={goBackIcon} alt="" className="goBackIconImage12" /></Link>
                <button className="logoutbtn7" onClick={() => history.push('/login')}><Logout /></button>
            </div>
            <button className="cancleBill" onClick={deleteBill}>Cancle Bill</button>
            <button className="printPreview" onClick={printDocument}>Print Preview</button>
                <div className="billView">
                    <div className="time">
                    <h4>Delivery Time: {createdTime} </h4><br />
                    <h4>Bill: {rowIndexx}</h4>
                    </div>
                    <div className="nameAmountPrice">
                    <h4>Name</h4>
                    <h4>Amount</h4>
                    <h4>Price</h4>
                    <h4>Total</h4>
                    </div>
                    <div className="linee"></div>
                    {billProducts.map(data1 => ( 
                            <div key={data1.id}>
                            <Table
                                key={data1.id}
                                productName={data1.productName}
                                amount={data1.amount}
                                price={data1.price}
                                total={data1.total}
                            />
                            </div>
                        ))}
                        <h3>Total: {t}</h3>                    
                </div>
        </div>
        </div>
        </div>
    );
}

export default BillDetailedView;