import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

const Dropdown = ({ title, func, children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <select 
        onChange={func} 
        defaultValue="0"
        className="appearance-none bg-zinc-800 border border-zinc-700 text-white pl-2 pr-8 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full"
      >
        <option value="0" disabled>{title}</option>
        {children}
      </select>
      <RiArrowDownSLine className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none text-lg" />
    </div>
  )
}

export default Dropdown;
