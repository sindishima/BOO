import React from "react";
import Header from "./Components/Header";
import Header1 from "./Components/Header1";
import Product from "./Components/product/Product";
import { Products, Items } from "./Components/product/Prd";
import Profile from "./Components/Profile";
import Text from "./Components/product/Text";
import NavBar from "./Components/NavBar";
import { Route } from "react-router-dom";
import Employee from "./Employee"
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';import GroupIcon from '@mui/icons-material/Group';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {Link} from "react-router-dom";

import './App.css'


function App(){
    return(
        <div className="App">
            <Header1 />
            <div className="fullPanel">
            <div className="imgnav">
            <Profile />
            <NavBar />
            <Route exact path="/" component={Product} />
            <Route exact path="/employee" component={Employee}></Route>
            </div>
            <div className="panel">
            <Header />
            <Text />
            <div className="productList">
                {Products.map(data => ( 
                        <div key={data.id}>
                        <Product
                            name={data.name}
                            price={data.price}
                            img={data.img}
                            amount={data.amount}
                            // color={ColorList.map(data1=>{
                            //     return(
                            //         <div>
                            //             style={{backgroundColor: red}}
                            //         </div>
                            //     )
                            // })}
                            // color={[
                            //     '#FFFFFF',
                            //     '#E6E6FA',
                            //   ].map((col) => (
                            //     <div key={col}>
                            //       style={{backgroundColor: red}}
                            //     </div>
                            color={data.color}
                            rect={data.rect}
                        />
                    </div>
                    ))
                }
            </div>
            <div>
                <ul>
                    <h3>Cantina</h3>
                        <a href="#" className="cofe">Burgers </a>
                        <a href="#" className="cofe">Sandwich </a>
                        <a href="#" className="cofe">Pizza </a>
                </ul>
            </div>
            <div className="productList">
                {Products &&
                    Products.map(data => ( 
                        <div key={data.id}>
                        <Product
                            name={data.name}
                            price={data.price}
                            img={data.img}
                            amount={data.amount}
                            color={data.color}
                            rect={data.rect}
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

export default App;