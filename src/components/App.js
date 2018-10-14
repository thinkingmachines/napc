import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import SidebarPage from './SidebarPage'
import Overlay from './Overlay'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Route exact path='/' render={props => <Overlay {...props} map={this.props.map} />} />
        <Route exact path='/:need' render={props => <Overlay {...props} map={this.props.map} />} />
        <Route exact path='/' render={props => <SidebarPage {...props} map={this.props.map} />} />
        <Route exact path='/:need' render={props => <SidebarPage {...props} map={this.props.map} />} />
      </div>
    )
  }
}

export default App
