import React from 'react'
import {
  BrowserRouter as Router, Switch,
  Route
} from 'react-router-dom'
import App from './App'
import Navbar from './components/Navbar.react'
import Lists from './components/Lists.react'
import About from './components/About.react'

const Routes = () => (
  <Router>
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/wordsearches" component={Lists} />
        <Route path="/about" component={About} />
        <Route path="/:id" component={App}/>
      </Switch>
    </div>
  </Router>
)

export default Routes
