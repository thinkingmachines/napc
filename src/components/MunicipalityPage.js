import React, { Component, Fragment } from 'react'

import { indicators, needs } from '../constants'
import nationalAverages from '../ind-avg.json'

import MunicipalityNeedItem from './MunicipalityNeedItem'
import OverlayMunicipalityPage from './OverlayMunicipalityPage'
import SidebarMunicipalityPage from './SidebarMunicipalityPage'

var tempMun = 'PH157001000'

class MunicipalityNeeds extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openIndex: -1
    }
  }

  toggleAccordion (index) {
    this.setState({
      openIndex: this.state.openIndex === index ? -1 : index
    })
  }

  render () {
    var needKeys = Object.keys(needs)

    return (
      <ul className='mun-sidebar-list'>
        {needKeys.map((need, i) => (
          <MunicipalityNeedItem
            key={need}
            i={i}
            score={nationalAverages[needs[need]['prop-col']] * (Math.random() * 0.5 + 0.75)}
            clickMethod={() => this.toggleAccordion(i)}
            className={this.state.openIndex === i ? 'mun-sidebar-item active' : 'mun-sidebar-item'}
            need={need}
            municipality={tempMun} />
        ))}
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

          <div className='mun-sidebar-label-div'>
            <div className='mun-sidebar-label'>National Average</div>
          </div>

          <MunicipalityNeeds />
        </SidebarMunicipalityPage>
      </Fragment>
    )
  }
}

export default MunicipalityPage
