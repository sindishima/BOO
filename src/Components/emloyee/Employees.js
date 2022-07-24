import React from 'react'
import { Link } from 'react-router-dom';

const colorList = ['#F7C0FF','#FFC2EE','#F9D0FF','#FDB2FF'] ;
var i = 0 ;

function indexColor(){
    if (i === 3) i=-1 ; 
    i++
    return colorList[i] ;
}

function Employee(props) {
    const {id, username, password, image, isActive} = props;
    return (
        <div className={`empl ${isActive ? `active` : ``}`} id={id} style={{background: indexColor()}}>
            <div className='nameimage'>
                <h4>{username}</h4>
                <Link to={`/editEmployee/${id}`} className="addEmployee">
                    <div className='imageEmplo'>
                        <img src={image} alt="" className='employeesPhotos' />
                    </div>
                </Link>
                </div>
        </div> 
    );
};

export default Employee