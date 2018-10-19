import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import mapboxgl from 'mapbox-gl'
import { initMap } from '../map'

import NeedsPage from './NeedsPage'

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
      style: 'mapbox://styles/thinkdatasci/cjlowf4kl65i12roauwxtc3ez',
      center: [121, 14.58],
      minZoom: 8,
      zoom: 10
    })
    initMap(map)
    this.setState({ map: map })
  }
  render () {
    return (
      <Fragment>
        <div id='map' />
        <Route
          path='/map/:need'
          render={props => this.state.map && <NeedsPage {...props} map={this.state.map} />}
        />
      </Fragment>
    )
  }
}

export default MapPage
