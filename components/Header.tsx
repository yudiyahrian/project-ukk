import React from 'react'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <div className='w-full py-4 pt-5 px-4 sticky top-0 bg-light z-30'>
      <SearchBar />
    </div>
  )
}

export default Header