import React, { Component, Fragment } from 'react'

import { indicators } from '../constants'
import OverlayMunicipalityPage from './OverlayMunicipalityPage'
import SidebarMunicipalityPage from './SidebarMunicipalityPage'

import { needs } from '../constants'

class MunicipalityStripPlot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      strip_data : []
    }
  }

  componentDidMount () {
    this.setState({
      strip_data: [
        { 'barangay': 'Barangay 1', 'value': 0.69 },
        { 'barangay': 'Barangay 2', 'value': 0.02 },
        { 'barangay': 'Barangay 3', 'value': 0.05 },
        { 'barangay': 'Barangay 4', 'value': 0.64 },
        { 'barangay': 'Barangay 5', 'value': 0.66 },
        { 'barangay': 'Barangay 6', 'value': 1 },
        { 'barangay': 'Barangay 7', 'value': 0.72 },
        { 'barangay': 'Barangay 8', 'value': 0.62 },
        { 'barangay': 'Barangay 9', 'value': 0.39 },
        { 'barangay': 'Barangay 10', 'value': 0.06 }
      ]
    })
  }

  render () {
    return (
      <div className='mun-sidebar-chart'>
        <svg width="100%" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" x2="90%" y1="calc(50% - 0.5)" y2="calc(50% - 0.5)" stroke="#CCC" stroke-width="1" />
          <line x1="10%" x2="10%" y1="5" y2="calc(100% - 5)" stroke="#CCC" stroke-width="1" />
          <line x1="90%" x2="90%" y1="5" y2="calc(100% - 5)" stroke="#CCC" stroke-width="1" />
          <line x1="calc(50% - 0.5)" x2="calc(50% - 0.5)" y1="5" y2="calc(100% - 5)" stroke="#CCC" stroke-width="1" />
          {this.state.strip_data.map((strip_data, i) => (
            <circle cx={ ((strip_data['value'] * 0.8 + 0.1) * 100) + "%" } cy="calc(50% - 0.5)" fill={needs[this.props.need].color} r="5" opacity="0.5"/>
          ))}
        </svg>
      </div>
      
    )
  }
}

class MunicipalityNeedItem extends Component {

  render () {
    return (
      <li className={ this.props.className } >
        <div className='mun-sidebar-header' onClick={ this.props.click_method.bind(this) }>
          <h4>{ this.props.title }</h4>
          <div className='mun-sidebar-header-chart'>
            <svg width="70" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <line x1="34.5" x2="34.5" y1="0" y2="20" stroke="#CCC" stroke-width="1"/>
              <rect x="5" y="8.5" width="29" height="3" fill="#E6E6E6" stroke-width="0"/>
              <rect x="3" y="6" width="2" height="8" fill={needs[this.props.need].color} stroke-width="0"/>
            </svg>
          </div>
        </div>
        <div className='mun-sidebar-content'>
          <div className='mun-sidebar-main-desc'>
            3 out of 10 0-5 year old children in Dumangas are <b>malnourished</b>
          </div>
          <div className='mun-sidebar-desc'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
          <div className='mun-sidebar-chart-desc'>
            Proportion of 0-5 year olds that are malnourished per barangay
          </div>
          <MunicipalityStripPlot need={this.props.need}/>
          <div className='mun-sidebar-chart-desc'>
            Proportion of farmers with insecure tenure
          </div>
          <MunicipalityStripPlot need={this.props.need}/>
        </div>
      </li>
    )
  }
}

class MunicipalityNeeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_index: -1
    };
  }

  toggle_accordion(index) {
    this.setState(
      {
        open_index: this.state.open_index == index ? -1 : index
      }
    )
  }

  render () {
    return (
      <ul className='mun-sidebar-list'>
        <MunicipalityNeedItem
          i="0"
          title="Food and Land Reform"
          click_method={() => this.toggle_accordion(0)}
          className={ this.state.open_index == "0" ? 'mun-sidebar-item active' : 'mun-sidebar-item' }
          need={this.props.need}/>
        <MunicipalityNeedItem
          i="1"
          title="Water and Sanitation"
          click_method={() => this.toggle_accordion(1)}
          className={ this.state.open_index == 1 ? 'mun-sidebar-item active' : 'mun-sidebar-item' }
          need={this.props.need}/>
        <MunicipalityNeedItem
          i="2"
          title="Shelter"
          click_method={() => this.toggle_accordion(2)}
          className={ this.state.open_index == 2 ? 'mun-sidebar-item active' : 'mun-sidebar-item' }
          need={this.props.need}/>
        <MunicipalityNeedItem
          i="3"
          title="Work"
          click_method={() => this.toggle_accordion(3)}
          className={ this.state.open_index == 3 ? 'mun-sidebar-item active' : 'mun-sidebar-item' }
          need={this.props.need}/>
        <MunicipalityNeedItem
          i="4"
          title="Health"
          click_method={() => this.toggle_accordion(4)}
          className={ this.state.open_index == 4 ? 'mun-sidebar-item active' : 'mun-sidebar-item' }
          need={this.props.need}/>
      </ul>
    )
  }
}

class MunicipalityPage extends Component {
  componentDidMount () {
    const { need } = this.props.match.params
    this.props.map.on('load', this.showIndicator.bind(this, need))
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
    // const indicator = indicators.find(function (d) { return d.id === need })
    // console.log('showIndicator', need, indicator)

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
        <OverlayMunicipalityPage need={need} map={map} />
        <SidebarMunicipalityPage need={need}>
          <h3>Basic Needs</h3>

          <div className='mun-sidebar-label'>National Average</div>

          <MunicipalityNeeds need={need}/>
        </SidebarMunicipalityPage>
      </Fragment>
    )
  }
}

export default MunicipalityPage
