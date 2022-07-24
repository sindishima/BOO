import React from 'react'
import { Link } from 'react-router-dom';

function Table(props) {
    const {id, productName, price, amount, total=(price)*(amount)} = props;
    return (
        <div className="productsAll">
                <p>{productName}</p>
                <p>{amount}</p>
                <p>{price}</p>
                <p>{total}</p>
        </div> 
    )
}

export default Table