import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import mapboxgl from 'mapbox-gl'

import App from './components/App'

mapboxgl.accessToken = '***REMOVED***'

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/thinkdatasci/cjlowf4kl65i12roauwxtc3ez',
  center: [121, 14.58],
  minZoom: 8,
  zoom: 10
})

map.on('load', function () {
  // add dataset
  map.addSource('barangays', {
    'type': 'vector',
    'url': 'mapbox://thinkdatasci.2h2dq70z'
  })
  // add layer
  map.addLayer({
    'id': 'barangays',
    'source': 'barangays',
    'source-layer': 'indicators_geo-9jhdlv',
    'type': 'fill'
  }, 'admin')
})

const root = document.getElementById('root')
const load = () => render((
  <AppContainer>
    <BrowserRouter><App /></BrowserRouter>
  </AppContainer>
), root)

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/App', load)
}

load()
