import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import mapboxgl from 'mapbox-gl'
import { initMap } from '../map'

import NeedsPage from './NeedsPage'
import MunicipalityPage from './MunicipalityPage'

import ReactDOM from 'react-dom'
import Tooltip from './tooltip'

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

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
      bayanClicked: null,
      Bayan:'Bayan'
    }
    this.resetBayan = this.resetBayan.bind(this)
  }

  titleCase (str) {
    if (str.includes('(') == true) {
      return str.substring(0, str.indexOf(' (')).toLowerCase().split(' ').map(function (word) {
        return word.replace(word[0], word[0].toUpperCase())
      }).join(' ')
    }
    else {
      return str.toLowerCase().split(' ').map(function (word) {
        return word.replace(word[0], word[0].toUpperCase())
      }).join(' ')
    }
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

    map.on('click', 'provinces', (e) => {
      const { id, layer, properties } = Array(e.features[0])[0]
      this.setState({
        id: id,
        layer: layer.maxzoom,
        Bayan: this.titleCase(properties.Pro_Name)
      })
    })

    const { munCode } = this.props.match.params

    this.setState({
      map: map,
      munCode: munCode
    })
  }

  resetBayan() {
    var map = this.state.map

    map.fitBounds([117.17427453, 5.58100332277, 126.537423944, 18.5052273625], { padding: 60 })
    map.setLayoutProperty('provinces', 'visibility', 'visible')
    map.setLayoutProperty('municities', 'visibility', 'none')
    map.setLayoutProperty('barangays', 'visibility', 'none')
    map.setLayoutProperty('outline', 'visibility', 'none')

    this.setState({
      Bayan: 'Bayan',
      munCode: null
    })
  }

  render () {
    const { need } = this.props.match.params
    if (this.props.match.path === '/map/:need' && this.state.munCode) {
      return <Redirect to={`/map/${need}/municipality/${this.state.munCode}`} />
    } else if (this.props.match.path === '/map/:need/municipality/:munCode' && this.state.munCode === null) {
      return <Redirect to={`/map/${need}`} />
    }
    return (
      <Fragment>
        <Switch>
          <Route
            exact path='/map/:need'
            render={() => <button id='fit' onClick={ this.resetBayan }>Back to the PH</button>}
          />
          <Route
            exact path='/map/:need/municipality/:munCode'
            render={() => <button id='fit' onClick={ this.resetBayan }>Back to Home</button>}
          />
        </Switch>
        <Switch>
          <Route
            exact path='/map/:need'
            render={props => this.state.map && <NeedsPage {...props} map={this.state.map} Bayan={this.state.Bayan} />}
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
