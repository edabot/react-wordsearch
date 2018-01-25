import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => (
  <div className="navbar_container">
    <div className='navbar no-print'>
      <div className='navbar_left'><Link to="/">Word Search Machine</Link></div>
      <div className='navbar_right'>
        <Link to="/wordsearches">Word Searches</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  </div>
)

export default navbar
