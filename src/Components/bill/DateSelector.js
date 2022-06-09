import React from 'react';
import './DateSelector.css'

function dateSelector(){
    return(
        <div class="date">
            <span className='span'>
                <select name="day" id="day"></select>
                    {/* <option value="1">1</option> */}
                <select name="month" id="month"></select>
                <select name="year" id="year"></select>
            </span>
            </div>
    )
}

export default dateSelector;