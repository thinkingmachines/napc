import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import SidebarPage from './SidebarPage'

const Map = () => (
  <div />
)

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Map />
        <Route exact path='/food' component={SidebarPage} />
        <Route exact path='/:need' component={SidebarPage} />
      </div>
    )
  }
}

export default App
