import mapboxgl from 'mapbox-gl'

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

export default map
