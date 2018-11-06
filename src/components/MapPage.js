import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import mapboxgl from 'mapbox-gl'
import { initMap } from '../map'

import NeedsPage from './NeedsPage'
import MunicipalityPage from './MunicipalityPage'

mapboxgl.accessToken = '***REMOVED***'

class MapPage extends Component {
  constructor () {
    super()
    this.state = {
      map: null
    }
  }
  componentDidMount () {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/napc/cjmg50kf8lu922snxuu4jbuft',
      center: [121, 11.75],
      minZoom: 3,
      zoom: 5
    })
    initMap(map)
    this.setState({ map: map })
    document.getElementById('fit').addEventListener('click', function () {
      map.fitBounds([117.17427453, 5.58100332277, 126.537423944, 18.5052273625], { padding: 60 })
      map.setLayoutProperty('provinces', 'visibility', 'visible')
      map.setLayoutProperty('municities', 'visibility', 'none')
      map.setLayoutProperty('barangays', 'visibility', 'none')
    })
  }
  render () {
    return (
      <Fragment>
        <button id='fit'>Zoom Out</button>
        <div id='map' />
        <Switch>
          <Route
            exact path='/map/:need'
            render={props => this.state.map && <NeedsPage {...props} map={this.state.map} />}
          />
          <Route
            exact path='/map/:need/municipality'
            render={props => this.state.map && <MunicipalityPage {...props} map={this.state.map} />}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default MapPage
