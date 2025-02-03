import React from 'react'

const Dropdown = ({title, func , children}) => {
  return (
    <div className='select'>
        <select onChange={func} defaultValue="0" name="format" id="format">
          <option value={title} disabled>{title}</option>
            {children}
        </select>
    </div>
  )
}

export default Dropdown
