import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { needs } from '../constants'
import Overlay from './Overlay'
import Sidebar from './Sidebar'

class NeedsPage extends Component {
  componentDidUpdate (prevProps) {
    const { need } = this.props.match.params
    if (prevProps.match.params.need !== need) {
      console.log('Do something with need:', need)
      console.log(this.props.map)
    }
  }

  render () {
    const need = this.props.match.params.need
    const map = this.props.map

    return (
      <Fragment>
        <Overlay need={need} map={map} />
        <Sidebar>
          <div className='description'>
            <img className='logo' src={'/static/img/napc-logo.png'} />
            <div className='header'> Ito ang <br />Kuwento ng Bayan </div>
            <div className='divider' />
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
            {Object.keys(needs).map(need => (
              <NavLink activeClassName='active' to={'/map/' + need} key={need}>
                <img className='logo-select' src={needs[need]['select-logo-path']} />
                <img className='logo-unselect' src={needs[need]['unselect-logo-path']} />
              </NavLink>
            ))}
          </div>
        </Sidebar>
      </Fragment>
    )
  }
}

export default NeedsPage
