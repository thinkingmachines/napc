import React, { Component, Fragment } from 'react'

import { indicators, needs } from '../constants'
import municipalityScores from '../ind-mun.json'

import MunicipalityNeedItem from './MunicipalityNeedItem'
import OverlayMunicipalityPage from './OverlayMunicipalityPage'
import SidebarMunicipalityPage from './SidebarMunicipalityPage'

import * as d3 from 'd3'

class MunicipalityNeeds extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openNeed: null,
      barangayIndicators: null
    }
  }

  componentDidMount () {
    var munCode = 'PH' + this.props.munCode
    this._asyncLoading = d3.json('../static/data/ind-bgy/' + munCode + '.json').then(data => {
      this.setState({
        openNeed: this.props.currNeed ? this.props.currNeed : null,
        barangayIndicators: data,
        munCode: munCode
      })
    })
  }

  componentWillUnmount () {
    this._asyncLoading.cancel()
  }

  toggleAccordion (need) {
    this.setState({
      openNeed: this.state.openNeed === need ? null : need
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
              score={municipalityScores[this.state.munCode][needs[need]['prop-col']]}
              clickMethod={() => this.toggleAccordion(need)}
              className={this.state.openNeed === need ? 'mun-sidebar-item active' : 'mun-sidebar-item'}
              need={need}
              barangayIndicators={this.state.barangayIndicators}
              munCode={this.state.munCode} />
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
    const { need, munCode } = this.props.match.params
    const { map } = this.props

    return (
      <Fragment>
        <OverlayMunicipalityPage need={need} map={map} munCode = {this.props.match.params.munCode} bbox = {this.props.bbox}/>
        <SidebarMunicipalityPage need={need} munCode = {this.props.match.params.munCode}>
          <h3>Basic Needs</h3>

          <div className='mun-sidebar-label-div'>
            <div className='mun-sidebar-label'>National Average</div>
          </div>

          <MunicipalityNeeds map={map} currNeed={need} munCode={munCode}/>
        </SidebarMunicipalityPage>
      </Fragment>
    )
  }
}

export default MunicipalityPage
