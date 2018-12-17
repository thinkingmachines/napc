import React, { Component, Fragment } from 'react'
import * as turf from '@turf/turf'

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
      barangayIndicators: null,
      indicatorDescriptions: null,
      needExplanations: null,
      munCode: null
    }
  }

  componentDidMount () {
    var munCode = 'PH' + this.props.munCode
    d3.json('../static/data/ind-bgy/' + munCode + '.json').then(data => {
      this.setState({
        openNeed: this.props.currNeed ? this.props.currNeed : null,
        barangayIndicators: data,
        munCode: munCode
      })
    })

    d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vSQebIhEjhFR3LewIiByv3yfqc2YY0GH-cO5mXjhfYDfJY5Z7vVGvtsVSKN-CjtZhNxe0gOzHN0_bDN/pub?gid=534002250&single=true&output=csv').then(data => {
      var desc = data.reduce((obj, row) => {
        obj[row['Indicator Variable']] = row['Indicator_Description']
          .replace('Number/Proportion of individuals with SSS / GSIS (up to barangay level)', 'Proportion of individuals without SSS / GSIS (up to barangay level)')
          .replace('Number/Proportion of households which received PhilHealth, Pantawid, and other Cash Transfers from government/LGU/NGO (up to barangay level)', 'Proportion of households which did not receive PhilHealth, Pantawid, and other Cash Transfers from government/LGU/NGO (up to barangay level)')
        return obj
      }, {})
      this.setState({
        indicatorDescriptions: desc
      })
    })

    d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vSQebIhEjhFR3LewIiByv3yfqc2YY0GH-cO5mXjhfYDfJY5Z7vVGvtsVSKN-CjtZhNxe0gOzHN0_bDN/pub?gid=1343037281&single=true&output=csv').then(data => {
      var expl = data.reduce((obj, row) => {
        obj[row['Need Variable']] = { text_before : row['Text Before'], text_after : row['Text After'], type : row['Type'] }
        return obj
      }, {})
      this.setState({
        needExplanations: expl
      })
    })
  }

  toggleAccordion (need) {
    this.setState({
      openNeed: this.state.openNeed === need ? null : need
    })
  }

  render () {
    if (
      this.state.barangayIndicators === null ||
      this.state.indicatorDescriptions === null ||
      this.state.needExplanations === null
    ) {
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
              indicatorDescriptions={this.state.indicatorDescriptions}
              needExplanation={this.state.needExplanations[need]}
              munScores={municipalityScores[this.state.munCode]}
              munCode={this.state.munCode}
              munName={this.props.munName} />
          ))}
        </ul>
      )
    }
  }
}

class MunicipalityPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      munData: null,
      munRanks: null,
      munTotalCounts: null
    }
  }

  componentDidMount () {
    d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vSQebIhEjhFR3LewIiByv3yfqc2YY0GH-cO5mXjhfYDfJY5Z7vVGvtsVSKN-CjtZhNxe0gOzHN0_bDN/pub?gid=0&single=true&output=csv').then(data => {
      Object.keys(data ? data: '').filter(index => this.props.match.params.munCode === data[index].MunCode).map(index => (
        this.setState({ munData: data[index] })
      ))
    })

    d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vSQebIhEjhFR3LewIiByv3yfqc2YY0GH-cO5mXjhfYDfJY5Z7vVGvtsVSKN-CjtZhNxe0gOzHN0_bDN/pub?gid=660297486&single=true&output=csv').then(ranks => {
      var ranksIndex = 0
      var totalIndex = 0

      Object.keys(ranks ? ranks : '').filter(index => this.props.match.params.munCode === ranks[index].Mun_Code).map(index => (
        ranksIndex = index
      ))
      Object.keys(ranks ? ranks : '').filter(index => ranks[index].Mun_Code === 'Total').map(index => (
        totalIndex = index
      ))

      this.setState({
        munRanks: ranks[ranksIndex],
        munTotalCounts: ranks[totalIndex]
      })
    })

    const { need, munCode } = this.props.match.params
    const { map } = this.props
    map.on('load', () => {
      this.showIndicator(need)
      map.setLayoutProperty('provinces', 'visibility', 'none')
      map.setLayoutProperty('municities', 'visibility', 'visible')
    })

    this.zoomOnLoad = function (e) {
      if (e.sourceId === 'municities' && e.isSourceLoaded) {
        const features = map.queryRenderedFeatures({layers: ['municities'],
          filter: ['==', 'Mun_Code', munCode]})
        const bbox = turf.bbox(features[0])
        map.fitBounds(bbox, { padding: 60 })
      }
    }

    map.on('sourcedata', this.zoomOnLoad)
  }

  componentWillUnmount () {
    const { map } = this.props

    map.off('sourcedata', this.zoomOnLoad)
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

  capitalizeWords(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render () {
    const { need, munCode } = this.props.match.params
    const { map } = this.props

    if (
      this.state.munData === null ||
      this.state.munRanks === null ||
      this.state.munTotalCounts === null
    ) {
      return null
    } else {
      return (
        <Fragment>
          <OverlayMunicipalityPage
            need={need}
            map={map}
            munCode={this.props.match.params.munCode}
            munData={this.state.munData}
            munRanks={this.state.munRanks}
            munTotalCounts={this.state.munTotalCounts}
            bbox={this.props.bbox}/>

          <SidebarMunicipalityPage
            need={need}
            munCode={this.props.match.params.munCode}
            munData={this.state.munData}
            munRanks={this.state.munRanks}>

            <h3>Basic Needs</h3>

            <div className='mun-sidebar-label-div'>
              <div className='mun-sidebar-label'></div>
            </div>

            <MunicipalityNeeds
              map={map}
              currNeed={need}
              munCode={munCode}
              munName={this.capitalizeWords(this.state.munData['Municipality'])} />
          </SidebarMunicipalityPage>
        </Fragment>
      )
    }
  }
}

export default MunicipalityPage
