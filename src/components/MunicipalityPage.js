import React, { Component, Fragment } from 'react'

import { indicators, needs } from '../constants'
import municipalityScores from '../ind-mun.json'

import MunicipalityNeedItem from './MunicipalityNeedItem'
import OverlayMunicipalityPage from './OverlayMunicipalityPage'
import SidebarMunicipalityPage from './SidebarMunicipalityPage'

import * as d3 from 'd3'

var tempMun = 'PH157002000'

class MunicipalityNeeds extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openIndex: -1,
      barangayIndicators: null
    }
  }

  componentDidMount () {
    this._asyncLoading = d3.json('../static/data/ind-bgy/' + tempMun + '.json').then(data => {
      this.setState({
        barangayIndicators: data
      })
    })
  }

  componentWillUnmount () {
    this._asyncLoading.cancel()
  }

  toggleAccordion (index) {
    this.setState({
      openIndex: this.state.openIndex === index ? -1 : index
    })
  }

  render () {
    if (this.state.barangayIndicators === null) {
      return null
    } else {
      var needKeys = Object.keys(needs)

      return (
        <ul className='mun-sidebar-list'>
          {needKeys.map((need, i) => (
            <MunicipalityNeedItem
              key={need}
              i={i}
              score={municipalityScores[tempMun][needs[need]['prop-col']]}
              clickMethod={() => this.toggleAccordion(i)}
              className={this.state.openIndex === i ? 'mun-sidebar-item active' : 'mun-sidebar-item'}
              need={need}
              barangayIndicators={this.state.barangayIndicators} />
          ))}
        </ul>
      )
    }
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
        <OverlayMunicipalityPage need={need} map={map} munName = {this.props.munName} />
        <SidebarMunicipalityPage need={need}>
          <h3>Basic Needs</h3>

          <div className='mun-sidebar-label-div'>
            <div className='mun-sidebar-label'>National Average</div>
          </div>

          <MunicipalityNeeds map={map} />
        </SidebarMunicipalityPage>
      </Fragment>
    )
  }
}

export default MunicipalityPage
