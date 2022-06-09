import React from 'react'
import ReactDom from 'react-dom' 
import { BrowserRouter } from 'react-router-dom';
import Employee from './Employee';
import EditProduct from './EditProduct';
import App from './App'
import Bill from "./Bill"

ReactDom.render(
    <BrowserRouter>
        {/* <App /> */}
        {/* <Employee></Employee> */}
        {/* <Bill></Bill> */}
        <EditProduct></EditProduct>
    </BrowserRouter>,
    document.getElementById('root')
);


