import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


function CategoryPopUp1(props) {

    return (props.trigger) ? (
        <div className='categoryPopup1'>
            <button className='popupButton1' onClick={() => props.setTrigger(false)}><CloseIcon /></button>
            <div className='writeCategoryName1'>
                {props.children}
            </div>
            </div>
    ) : "";
}

export default CategoryPopUp1
