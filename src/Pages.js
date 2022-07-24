import React from 'react';
import Employee from './Employee';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Product from './App'
import Bill from './Bill'
import Inventory from './Inventory';
import EditCredentials from './EditCredentials';
import Login from './Login';
import EditEmployee from './EditEmployee';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';
import AddEmployee from './AddEmployee';
import BillDetailedView from './BillDetailedView';


function Pages(){
    return(
        <BrowserRouter>
        <Redirect from="/" to="/login" />
            <Route path="/login" component={Login} />
            <Route path="/edit" component={EditCredentials} />

            <Route path="/product" component={Product} />
            <Route path="/addProduct/:id" component={AddProduct} />
            <Route path="/editProduct/:id" component={EditProduct} />

            <Route exact path="/employee" component={Employee} />
            <Route path='/addEmployee' component={AddEmployee} />
            <Route path='/editEmployee/:id' component={EditEmployee} />

            <Route exact path="/bills" component={Bill} />
            <Route exact path="/billDetailedView/:id/:rowIndexx" component={BillDetailedView} />
            <Route exact path="/inventory" component={Inventory} />
        </BrowserRouter>
    );
}

export default Pages;