import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import NeedsPage from './NeedsPage'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Route exact path='/' component={NeedsPage} />
        <Route exact path='/:need' component={NeedsPage} />
      </div>
    )
  }
}

export default App
