import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


function CategoryPopUp(props) {

    return (props.trigger) ? (
        <div className='categoryPopup'>
            <button className='popupButton' onClick={() => props.setTrigger(false)}><CloseIcon /></button>
            <div className='writeCategoryName'>
                {/* <form > */}
                {/* <label htmlFor="" className='categoryNameText'>Category name:</label><br />
                <input type="text" name="" id="" className='inputCategory'  /><br /> */}
                {props.children}
                {/* <button className='confirmPopup' onClick={() => props.setTrigger(false)}><p className='confirmPopupText'>Confirm</p></button> */}
                {/* </form> */}
            </div>
            </div>
    ) : "";
}

export default CategoryPopUp
