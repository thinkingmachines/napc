import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

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
      center: [121, 11.75],
      minZoom: 3,
      zoom: 5
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
        <footer>
          <div className='footer-content-holder'>
            <a className='footer-text redirect-buttons' href='/map/food'><p>Ito and Kwento ng Bayan 2018</p></a>
            <a className='footer-text redirect-buttons' href='/contact'><p>Contact Us</p></a>
            <a className='footer-text redirect-buttons' href='/about/food'><p>About Us</p></a>
          </div>
        </footer>
      </Fragment>
    )
  }
}

export default styled(MapPage)`
  footer{
    position:absolute !important;
    bottom:0;
    width:100%;
    background:#525251;
  }
  
  .footer-content-holder{
    height:5vh;
    display:flex;
    width:50vh;
    padding-left:90vh;
  }  

  .footer-text{
    font-family:'Proxima Nova';
    color: white;
    text-align:center;
    padding-right: 2vh;
    font-size:1.5vh;
  }
  
  .redirect-buttons{
    text-decoration:none;
  }
`
