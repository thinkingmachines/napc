import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import MapPage from './MapPage'
import AboutPage from './AboutPage'
import ContactUsPage from './ContactUsPage'

class App extends Component {
  componentDidMount () {
    document.title = 'Talambayan: Tala ng Bayan Laban sa Kahirapan'
  }

  render () {
    return (
      <div className='App'>
        <Switch>
          <Route path='/about/:need' component={AboutPage} />
          <Route path='/contact' component={ContactUsPage} />
          <Route path='/map/:need/municipality/:munCode' component={MapPage} />
          <Route path='/map/:need' component={MapPage} />
          <Redirect from='/' to='/map/food' />
          <Redirect from='/about' to='/about/food' />
        </Switch>
        <footer>
          <div className='footer-content-holder'>
            <a className='footer-text redirect-buttons' href='/map/food'>
              <p>Ito and Kwento ng Bayan 2018</p>
            </a>
            <a className='footer-text redirect-buttons' href='/contact'>
              <p>Contact Us</p>
            </a>
            <a className='footer-text redirect-buttons' href='/about/food'>
              <p>About The Data</p>
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

export default App
