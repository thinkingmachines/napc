import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import mapboxgl from 'mapbox-gl'
import { initMap } from '../map'

import NeedsPage from './NeedsPage'
import MunicipalityPage from './MunicipalityPage'

import ReactDOM from 'react-dom'
import Tooltip from './tooltip'

mapboxgl.accessToken = '***REMOVED***'

class MapPage extends Component {
  tooltipContainer

  setTooltip(features) {
    if (features.length) {
      ReactDOM.render(
        React.createElement(
          Tooltip, {
            features
          }
        ),
        this.tooltipContainer
      )
    } else {
      this.tooltipContainer.innerHTML = ''
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      map: null,
      munCode: null, 
      munName: null
    }
  }
  componentDidUpdate (prevProps) {
    const need = this.props.match.params.need
  }
  componentDidMount () {
    this.tooltipContainer = document.createElement('div');

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/napc/cjmg50kf8lu922snxuu4jbuft',
      center: [121, 11.75],
      minZoom: 3,
      zoom: 5
    })

    initMap(map)
    
    const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
      offset: [0, -10]
    }).setLngLat([0,0]).addTo(map)

    map.on('mousemove', 'provinces', (e) => {
      const features = map.queryRenderedFeatures(e.point)
      tooltip.setLngLat(e.lngLat)
      map.getCanvas().style.cursor = features.length ? 'pointer' : ''
      this.setTooltip(features)
    })

    map.on('mousemove', 'municities', (e) => {
      const features = map.queryRenderedFeatures(e.point)
      tooltip.setLngLat(e.lngLat)
      map.getCanvas().style.cursor = features.length ? 'pointer' : ''
      this.setTooltip(features)
    })

    map.on('click', 'municities', (e) => {
      const { properties } = Array(e.features[0])[0]
      const munCode = properties.Mun_Code
      this.setState({ munCode: munCode })
    })
    
    this.setState({ map: map })

    document.getElementById('fit').addEventListener('click', function () {
      map.fitBounds([117.17427453, 5.58100332277, 126.537423944, 18.5052273625], { padding: 60 })
      map.setLayoutProperty('provinces', 'visibility', 'visible')
      map.setLayoutProperty('municities', 'visibility', 'none')
      map.setLayoutProperty('barangays', 'visibility', 'none')
    })
  }
  render () {
    if (this.props.match.path === '/map/:need' && this.state.munCode) {
      const { need } = this.props.match.params
      return <Redirect to={`/map/${need}/municipality/${this.state.munCode}`} />
    }
    return (
      <Fragment>
        <button id='fit'>Back to the PH</button>
        <div id='map' />
        <Switch>
          <Route
            exact path='/map/:need'
            render={props => this.state.map && <NeedsPage {...props} map={this.state.map} />}
          />
          <Route
            exact path='/map/:need/municipality/:munCode'
            render={props => this.state.map && <MunicipalityPage {...props} map={this.state.map} />}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default MapPage
