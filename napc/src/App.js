import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import SidebarPage from './SidebarPage'

const Map = () => (
  <div>I'm a map</div>
)

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Map />
        <Route exact path='/' component={SidebarPage} />
        <Route exact path='/:need' component={SidebarPage} />
      </div>
    )
  }
}

export default App
