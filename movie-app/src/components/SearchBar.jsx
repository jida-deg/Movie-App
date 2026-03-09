import React from 'react'

function SearchBar({value,onChange,onSearch}) {
    const handleKeyPress=(e)=>{
        if(e.key==="Enter"){
            onSearch(value)
        }
    }
  return ( 
    <div className='search-container'>
  <input 
  value={value} 
  onChange={(e) => onChange(e.target.value)} 
  onKeyDown={handleKeyPress} 
  type="text" 
  className="search-input" 
  placeholder="search..." 
/>
        <button className='search-button' onClick={()=>onSearch(value)}>🔍</button>
    </div>
  )
}

export default SearchBar
