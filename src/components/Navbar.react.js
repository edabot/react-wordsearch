import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {drawerOpen: false};
  }

  handleToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

  render() {
    return (
      <div>
        <AppBar
          className="navbar_mobile"
            title="Word Search Machine"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonClick={this.handleToggle}
          />
        <div className="navbar_desktop">
          <div className='navbar no-print'>
            <div className='navbar_left'><Link to="/">Word Search Machine</Link></div>
            <div className='navbar_right'>
              <Link to="/wordsearches">Word Searches</Link>
              <Link to="/about">About</Link>
            </div>
          </div>
        </div>
        <Drawer docked={false}
          open={this.state.drawerOpen}
          className="drawer"
          onRequestChange={(drawerOpen) => this.setState({drawerOpen})}>
          <MenuItem onClick={this.handleToggle}><Link to="/">Word Search Machine</Link></MenuItem>
          <MenuItem onClick={this.handleToggle}><Link to="/wordsearches">Word Searches</Link></MenuItem>
          <MenuItem onClick={this.handleToggle}><Link to="/about">About</Link></MenuItem>
        </Drawer>

      </div>
    )
  }
}


export default Navbar
