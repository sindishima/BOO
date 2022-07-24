import React from 'react'
import { Link } from 'react-router-dom';

import '../cssStyles/App.css'

const colorList = ['#F7C0FF','#FFC2EE','#F9D0FF','#FDB2FF'] ;
var i = -1 ;

function indexColor(){
    if (i === 3) i=-1 ; 
    i++
    return colorList[i];
}

const colorRect = ['#F4A6FF', '#FFABCF','#EEB5F7','#FF9DE4'] ;
var j = -1 ;

function indexColorRect(){
    if (j === 3) j=-1 ; 
    j++
    return colorRect[j] ;
}

function Product(props) {
    const {name, price, image, amount, categroy_id, id} = props;

    return (
        <div className='product' id={id} categroy_id={categroy_id} style={{background: indexColor()}}>
            <div className='rectangle' style={{background: indexColorRect()}}>
                <h4>{amount}</h4>
            </div>
            <div className='npi'>
                <div className='namename'>
                    <p>{name}</p>
                    <p>{price}L</p>
                </div>
                <Link to={`/editProduct/${id}`} className="addProduct">
                    <div className='imagePrd'>
                        <img src={image} alt="" className='productsImages'/>
                    </div>
                </Link>
            </div>
        </div> 
    );
};

export default Product