import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => (
  <div className='navbar no-print'>
    <div className='navbar_left'><Link to="/">Home</Link></div>
    <div className='navbar_right'>
      <Link to="/wordsearches">Word Searches</Link>
      <Link to="/about">About</Link>
    </div>
  </div>
)

export default navbar
