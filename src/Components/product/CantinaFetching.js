import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";

function CantinaFetching(){
    const [cat, setCat]=useState([]);

    useEffect =()=>{
        axios.get("http://localhost:8080/category/belonging/cafeteria").then(res=>{
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        })
    }
    return(
        <div>
            
        </div>
    );
}