import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import mapboxgl from 'mapbox-gl'
import { initMap } from '../map'

import NeedsPage from './NeedsPage'
import MunicipalityPage from './MunicipalityPage'

mapboxgl.accessToken = '***REMOVED***'

class MapPage extends Component {
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
    if (prevProps.match.params.need !== need) {
      console.log('Do something with need:', need)
      console.log(this.props.map)
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
    map.on('click', 'municities', (e) => {
      const { properties } = Array(e.features[0])[0]
      const munCode = properties.Mun_Code
      this.setState({ munCode: munCode })
      console.log(this.props.match.params.munCode)
      for(var i = 0; i < Array(e.features[0]).length; i++) {
        if(this.props.match.params.munCode === Array(e.features[0])[0].properties.Mun_Code) {
          console.log(Array(e.features[0])[0].properties.Mun_Name)
          const munName = Array(e.features[0])[0].properties.Mun_Name
          this.setState ({ munName: munName })
        }
      }
      return -1
    })

    map.on('load', function () {
      for(var i = 0; i < Array(geojson.features[0]).length; i++) {
        if(this.props.match.params.munCode === Array(geojson.features[0])[0].properties.Mun_Code) {
          console.log(Array(geojson.features[0])[0].properties.Mun_Name)
          const munName = Array(geojson.features[0])[0].properties.Mun_Name
          this.setState ({ munName: munName })
        }
      }
      return -1
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
            render={props => this.state.map && <MunicipalityPage {...props} munName={this.state.munName} map={this.state.map} />}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default MapPage
