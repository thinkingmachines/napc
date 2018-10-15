import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { needs } from '../constants'
import '../static/css/SidebarPage.css'

class SidebarPage extends Component {
  componentDidUpdate (prevProps) {
    const { need } = this.props.match.params
    if (prevProps.match.params.need !== need) {
      console.log('Do something with need: ', need)
    }
  }
  render () {
    return (
      <div className='sidebar'>
        <div className='description'>
          <img className='logo' src={'/static/img/napc-logo.png'} />
          <div className='header'> Ito ang <br />Kuwento ng Bayan </div>
          <div className='divider'></div>
          <div className='textbody'>
          A comprehensive, barangay-level map on data across the ten basic needs. Click on a category below to see how each province ranks on different needs.
          </div>
        </div>
        <div className='need-icon-header'>
          <h3>
            Basic Needs
          </h3>
          <div className='textbody category'>
            Select a Category Below
          </div>
        </div>
        <div className='need-icons'>
          {Object.keys(needs).map(path => (
            <NavLink activeClassName='active' to={path} key={path}>
              <img className='logo-select' src={needs[path]['select-logo-path']} />
              <img className='logo-unselect' src={needs[path]['unselect-logo-path']} />
            </NavLink>
          ))}
        </div>
      </div>
    )
  }
}

export default SidebarPage
