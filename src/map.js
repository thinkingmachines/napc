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
      'type': 'fill'
    }, 'admin')
    map.setLayoutProperty('provinces', 'visibility', 'visible')
    map.setLayoutProperty('municities', 'visibility', 'none')
    map.setLayoutProperty('barangays', 'visibility', 'none')
  })

  function zoomOnClick () {
    map.on('click', 'provinces', function (e) {
      var bbox = turf.bbox(e.features[0])
      console.log(bbox)
      map.fitBounds(bbox, { padding: 30 })
      console.log('hide province, show mun')
      map.setLayoutProperty('provinces', 'visibility', 'none')
      map.setLayoutProperty('municities', 'visibility', 'visible')
    })
    map.on('click', 'municities', function (e) {
      var bbox = turf.bbox(e.features[0])
      map.fitBounds(bbox, { padding: 50 })
      console.log('hide municipality, show bgy')
      map.setLayoutProperty('municities', 'visibility', 'none')
      map.setLayoutProperty('barangays', 'visibility', 'visible')
    })
  }
  map.on('load', zoomOnClick)
  map.scrollZoom.disable()
}
