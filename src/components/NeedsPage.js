import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { needs, indicators } from '../constants'
import Overlay from './Overlay'
import Sidebar from './Sidebar'

class NeedsPage extends Component {
  constructor () {
    super()
    this.state = {
      provData: {},
      Bayan: 'Bayan'
    }
  }
  titleCase (str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase())
    }).join(' ')
  }
  componentDidMount () {
    const { need } = this.props.match.params
    this.props.map.on('load', this.showIndicator.bind(this, need))
    this.props.map.on('click', 'provinces', (e) => {
      const { id, layer, properties } = Array(e.features[0])[0]
      this.setState({
        id: id,
        layer: layer.maxzoom,
        Bayan: this.titleCase(properties.Pro_Name)
      })
    })
    document.getElementById('fit').addEventListener('click', function () {
      console.log('back to bayan')
      this.setState = {
        Bayan: 'Bayan'
      }
    })
  }
  componentDidUpdate (prevProps) {
    const { need } = this.props.match.params
    if (prevProps.match.params.need !== need) {
      this.showIndicator(need)
    }
  }
  showIndicator (need) {
    const indicator = indicators[need]
    const map = this.props.map

    map.setPaintProperty('municities', 'fill-outline-color', indicator.paint['fill-outline-color'])
    map.setPaintProperty('barangays', 'fill-outline-color', indicator.paint['fill-outline-color'])
    map.setPaintProperty('provinces', 'fill-outline-color', indicator.paint['fill-outline-color'])

    map.setPaintProperty('municities', 'fill-color', indicator.paint['fill-color'])
    map.setPaintProperty('barangays', 'fill-color', indicator.paint['fill-color'])
    map.setPaintProperty('provinces', 'fill-color', indicator.paint['fill-color'])

    map.setPaintProperty('municities', 'fill-opacity', indicator.paint['fill-opacity']['municities'])
    map.setPaintProperty('barangays', 'fill-opacity', indicator.paint['fill-opacity']['barangays'])
    map.setPaintProperty('provinces', 'fill-opacity', indicator.paint['fill-opacity']['provinces'])
  }

  render () {
    const { need } = this.props.match.params
    const { map } = this.props
    return (
      <Fragment>
        <Overlay need={need} map={map} />
        <Sidebar>
          <div className='description'>
            <img className='logo' src={'/static/img/napc-logo.png'} />
            <div className='header'> Ito ang <br />Kuwento ng {this.state.Bayan} </div>
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
