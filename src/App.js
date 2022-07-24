import React, { Children, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import addIcon from './Components/emloyee/AddIcon.png'
import Header from "./Components/Header";
import Header1 from "./Components/Header1";
import Product from "./Components/product/Product";
import Profile from "./Components/Profile";
import Text from "./Components/product/Text";
import Text1 from "./Components/product/Text1";
import NavBar from "./Components/NavBar";
import CategoryPopUp from "./Components/product/CategoryPopUp";
import { useHistory } from "react-router-dom";
import plusIcon from './Components/product/img/plusIcon.png'
import {Cafeteria, Menu, Menu1, Cantina} from "./Components/product/Cafeteria";
import AddProduct from "./AddProduct";
import CategoryPopUp1 from "./Components/product/CategoryPopUp1";
import {SearchRounded} from "@mui/icons-material"
import {Logout} from "@mui/icons-material"
import axios from 'axios'
import { useParams } from "react-router-dom";
import './Components/cssStyles/App.css'
import './Components/cssStyles/CategoryPopup.css'

function App(){
    const history = useHistory();

    //API ALL PRODUCTS 
    const [allProducts, setAllProducts]=useState([])
    const [lo, setLo]=useState(false);

    useEffect(()=>{
        if(lo===false){ 
        axios.get("http://localhost:8080/product").then(rs=>{
            console.log("All products",rs.data)
            setAllProducts(rs.data)
            setLo(true)
        })
        .catch(err => {
            console.log(err);
        })
    }},[allProducts, lo]);

    
    //CATEGORIES CAFETERIA
    const [catCafeteria, setCatCafeteria]=useState([]);
    const [catCantina, setCatCantina]=useState([]);
    const [load, setLoad]=useState(false);

    useEffect(()=>{
        if(load===false){ 
            axios.get("http://localhost:8080/category/belonging/cantina").then(res=>{
                console.log("Categories cantina", res.data)
                setCatCantina(res.data)
                setLoad(true)
            })
            axios.get("http://localhost:8080/category/belonging/cafeteria").then(res=>{
                console.log("Categories cafeteria", res.data)
            setCatCafeteria(res.data)
            setLoad(true)
            })
            .catch(err => {
                console.log(err);
            })
        }},[catCafeteria, load]);


    //POPUP-CAFETERIA
    const [buttonPopup, setButtonPopup]=useState(false);
    const [name, setInputValue] = useState("");

    const handleSubmit=()=>{
           // e.preventDefault();
        const belonging=1;
        const newCategory={name, belonging};
        axios.post("http://localhost:8080/category", newCategory).then(res=>{
            console.log("new Categories ",res.data)
            setCatCafeteria(res.data)
        })
        if(newCategory){
            setCatCafeteria.push(newCategory);
        }
    }


        //POPUP-CANTINA
        const [buttonPopup1, setButtonPopup1]=useState(false);

        const handleSubmit1=()=>{
               // e.preventDefault()
            const belonging=0
            const newCategory={name, belonging};
            axios.post("http://localhost:8080/category", newCategory).then(res=>{
                console.log("new Categories ",res.data)
                setCatCantina(res.data)
            })
            if(newCategory){
                setCatCantina.push(newCategory);
            }
        }


    //SEARCH
    const [searchInput, setSearchInput]=useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = allProducts.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
            console.log(filteredData);
            console.log(searchInput.length);
        }
        else{
            setFilteredResults(allProducts);
        }
    }

    
    //PRODUCTS CAFETERIA
    const [prdCafeteria, setPrdCafeteria]=useState([])
    const [l, setL]=useState(false);
    
    useEffect(()=>{
        if(l===false){ 
            axios.get("http://localhost:8080/category/belonging/cafeteria").then(r=>{
                console.log("Products cafeteria",r.data)
                setPrdCafeteria(r.data)
                setL(true)
            })
            .catch(err => {
                console.log(err);
            })
        }
    },[prdCafeteria, l]);

    
    //CAFETERIA
    const [isMainData, setMainData]=useState(
        ()=>{
                axios.get("http://localhost:8080/category/3/product").then(r=>{
                console.log("initial",r.data)
                setMainData(r.data)
        })}
        );
    
    useEffect(() => { 
        const text = document.querySelector(".productListCafeteria").querySelectorAll(".cofe");

        function setMenuActive() {
            text.forEach((n) => {
                n.style.color = 'black';
                n.classList.remove("active")
            });
            this.classList.add("active");
            console.log("Active1 class", text)
            this.style.color="#cf4e97"
        }

        text.forEach((n) => n.addEventListener("click", setMenuActive));
    }, [isMainData]);
        


    const [id, setId]=useState("")
    const setData = (n) =>{
        if(prdCafeteria.filter((el) => el.name===n)){ 
            const fil=prdCafeteria.filter((el) => el.name===n);
            // console.log("Active category id",fil[0].id)
            setId(fil[0].id)
            const list=fil[0].products;
            setMainData(list);
        }
    }


        //PRODUCTS CANTINA
        const [prdCantina, setPrdCantina]=useState([])
        const [loadCantina, setLoadCantina]=useState(false);
    
        useEffect(()=>{
            if(loadCantina===false){ 
            axios.get("http://localhost:8080/category/belonging/cantina").then(r=>{
                console.log("Products cantina",r.data)
                setPrdCantina(r.data)
                setLoadCantina(true)
            })
            .catch(err => {
                console.log(err);
            })
        }
    },[prdCantina, loadCantina]);

    
    //CANTINA
    const [isMainData1, setMainData1]=useState(
        ()=>{
            axios.get("http://localhost:8080/category/47/product").then(r=>{
            console.log("initial",r.data)
            setMainData1(r.data)
    })}
    );

    useEffect(() => { 
        const text1 = document.querySelector(".productListCantina").querySelectorAll(".cofe1");
        console.log(text1)

        function setMenuActive1() {
            text1.forEach((n) => {
                n.style.color = 'black';
                n.classList.remove("active")
            });
            this.classList.add("active");
            console.log("Active1 class", text1)
            this.style.color="#cf4e97"
        }

        text1.forEach((n) => n.addEventListener("click", setMenuActive1));
    }, [isMainData1]);


    const[idd, setIdd]=useState("")
    const setData1 = (n) =>{
        if(prdCantina.filter((el) => el.name===n)){ 
            const fil=prdCantina.filter((el) => el.name===n);
            const list=fil[0].products;
            setIdd(fil[0].id)
            console.log(id)
            console.log("List",list);
            setMainData1(list);
        }
    }


    return(
        <div className="App">
            <Header1 />
            <div className="fullPanel">
            <div className="profileAndNav">
                    <Profile />
            <NavBar />
            </div>
            <div className="panel">
            <header className="headerr">
            <div className="inputBox">
                <SearchRounded />
                <div><input type="text" value={searchInput} placeholder="               Search" className="search" onChange={(e) => searchItems(e.target.value)}/></div>
            </div>
            <button className="logoutbtn" onClick={() => history.push('/login')}><Logout /></button>
            </header>
            <div className="productListCafeteria">
                    {catCafeteria && 
                        catCafeteria.map((data) => ( 
                        <div key={data.id} onClick={()=>setData(data.name)}>
                        <Text
                            name={data.name}
                            isActive={data.id === "1" ? true : false}
                            id={data.id}
                        />
                    </div>
                    ))}      

                <button className="buttonPopupProduct" onClick={()=> setButtonPopup(true)}><img src={plusIcon} alt="" className="plusIconImage" />
                <p className="addProductText">add category</p>
                </button>
            </div>
            
            <CategoryPopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
                <form onSubmit={handleSubmit} >
                <label htmlFor="" className='categoryNameText'>Category name:</label><br />
                <input type="text" name="" id="" className='inputCategory' value={name} onChange={(event) => setInputValue(event.target.value)} /><br />
                <button className='confirmPopup'><p className='confirmPopupText'>Confirm</p></button>
            </form>
            </CategoryPopUp>

            <Link to={`/addProduct/${id}`} className="addProduct"> 
                <img src={addIcon} alt="" className="addIconProductImage" />
            </Link>
            <div className="productItemListCafeteria">
            {searchInput.length > 0 ? (
                    filteredResults.map(data1 => ( 
                            <div key={data1.id} onClick={()=>setData(data1.id)}>
                            <Product
                                key={data1.id}
                                id={data1.id}
                                category_id={data1.category_id}
                                name={data1.name}
                                price={data1.price}
                                image={data1.image}
                                amount={data1.amount}
                                color={data1.color}
                                rect={data1.rect}
                            />
                            </div>
                        ))
                ) : (
                isMainData && isMainData.map((data) => ( 
                        <Product
                            key={data.id}
                            id={data.id}
                            categroy_id={data.categroy_id}
                            name={data.name}
                            price={data.price}
                            image={data.image}
                            amount={data.amount}
                            color={data.color}
                            rect={data.rect}
                        />
                    ))
                )}

            </div>
            <div className="productListCantina">
                {catCantina && 
                        catCantina.map((data) => ( 
                        <div key={data.id} onClick={()=>setData1(data.name)}>
                        <Text1
                            name={data.name}
                            isActive={data.id === "1" ? true : false}
                        />
                    </div>
                    ))}   
                
                <button className="buttonPopupProduct1" onClick={()=> setButtonPopup1(true)}><img src={plusIcon} alt="" className="plusIconImage1" />
                    <p className="addProductText1">add category</p>
                </button>
            </div> 
            <CategoryPopUp1 trigger={buttonPopup1} setTrigger={setButtonPopup1}>
                <form onSubmit={handleSubmit1} >
                <label htmlFor="" className='categoryNameText1'>Category name:</label><br />
                <input type="text" name="" id="" className='inputCategory1' value={name} onChange={(event) => setInputValue(event.target.value)} /><br />
                <button className='confirmPopup1'><p className='confirmPopupText1'>Confirm</p></button>
            </form>
            </CategoryPopUp1>

            <Link to={`/addProduct/${idd}`} className="addProduct"><img src={addIcon} alt="" className="addIconProductImage" /></Link>
            <div className="productItemListCantina">
            {searchInput.length > 0 ? (
                    filteredResults.map(data1 => ( 
                            <div key={data1.id} onClick={()=>setData1(data1.id)}>
                            <Product
                                key={data1.id}
                                id={data1.id}
                                category_id={data1.category_id}
                                name={data1.name}
                                price={data1.price}
                                image={data1.image}
                                amount={data1.amount}
                                color={data1.color}
                                rect={data1.rect}
                            />
                            </div>
                        ))
                ) : (
                isMainData1 && isMainData1.map((data1) => ( 
                        <div key={data1.id} onClick={()=>setData1(data1.id)}>
                        <Product
                            key={data1.id}
                            id={data1.id}
                            category_id={data1.category_id}
                            name={data1.name}
                            price={data1.price}
                            image={data1.image}
                            amount={data1.amount}
                            color={data1.color}
                            rect={data1.rect}
                        />
                        </div>
                    ))
                )}
            </div>
        </div>
        </div> 
        </div>
    );
}

export default App;