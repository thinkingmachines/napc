import 'mapbox-gl/dist/mapbox-gl.css'
import * as turf from '@turf/turf'

export function initMap (map) {
  map.on('load', function () {
    map.addSource('municities', {
      'type': 'vector',
      'url': 'mapbox://napc.dz1amgws'
    })
    map.addLayer({
      'id': 'municities',
      'source': 'municities',
      'source-layer': 'final-mun-indicators-2uxci9',
      'minzoom': 6.5,
      'maxzoom': 8.6,
      'type': 'fill'
    }, 'admin')

    map.addSource('barangays', {
      'type': 'vector',
      'url': 'mapbox://napc.12hyw5jd'
    })
    map.addLayer({
      'id': 'barangays',
      'source': 'barangays',
      'source-layer': 'final-bgy-indicators-ahy1fq',
      'minzoom': 8.6,
      'type': 'fill'
    }, 'admin')

    map.addSource('provinces', {
      'type': 'vector',
      'url': 'mapbox://napc.6ajh5yct'
    })
    map.addLayer({
      'id': 'provinces',
      'source': 'provinces',
      'source-layer': 'final-prov-indicators-3uffl2',
      'maxzoom': 6.5,
      'type': 'fill'
    }, 'admin')
  })

  function zoomOnClick () {
    map.on('click', 'provinces', function (e) {
      var bbox = turf.bbox(e.features[0])
      map.fitBounds(bbox, { padding: 30 })
    })
    map.on('click', 'municities', function (e) {
      var bbox = turf.bbox(e.features[0])
      map.fitBounds(bbox, { padding: 50 })
    })
  }
  map.on('load', zoomOnClick)
  // map.scrollZoom.disable()
}
