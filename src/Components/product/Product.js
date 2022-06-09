import React from 'react'

import '../../App.css'


function Product(props) {
    const {name, price, img, amount, color, rect} = props;
    return (
        <div className='product' style={{background: color}}>
            <div className='rectangle' style={{background: rect}}>
                <h4 className='amount'>{amount}</h4>
            </div>
            <div className='npi'>
                <h4>{name}</h4>
                <h5>{price}</h5>
                <img src={img} alt="" />
                </div>
        </div> 
    );
};

export default Product