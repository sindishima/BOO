import React from 'react'


function Employee(props) {
    const {name, img, color} = props;
    return (
        <div className='product' style={{background: color}}>
            <div className='npi'>
                <h4>{name}</h4>
                <img src={img} alt="" />
                </div>
        </div> 
    );
};

export default Employee