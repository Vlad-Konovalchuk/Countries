import React from 'react';


export const Select = ({data,handleChangeSelect}) => {
    return (
        <select
            className='select-region'
            name="changeregion"
            onChange={(e) => handleChangeSelect(e)}>
            {data.map((item, index) => {
                return (
                    <option key={index} value={item}>
                        {item}
                    </option>)
            })}
        </select>
    )
}