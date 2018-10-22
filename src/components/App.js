import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import MapPage from './MapPage'
import AboutPage from './AboutPage'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Switch>
          <Route path='/about/:need' component={AboutPage} />
          <Route path='/map' component={MapPage} />
          <Redirect from='/' to='/map/food' />
        </Switch>
      </div>
    )
  }
}

export default App
