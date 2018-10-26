import 'mapbox-gl/dist/mapbox-gl.css'
import * as turf from '@turf/turf'

export function initMap (map) {
  map.on('load', function () {
    map.addSource('municities', {
      'type': 'vector',
      'url': 'mapbox://thinkdatasci.521iq43v'
    })
    map.addLayer({
      'id': 'municities',
      'source': 'municities',
      'source-layer': 'final-mun-indicators-5hkam3',
      'minzoom': 6.5,
      'maxzoom': 8.6,
      'type': 'fill'
    }, 'admin')

    map.addSource('barangays', {
      'type': 'vector',
      'url': 'mapbox://thinkdatasci.6p3k95vf'
    })
    map.addLayer({
      'id': 'barangays',
      'source': 'barangays',
      'source-layer': 'final-bgy-indicators-d0c3va',
      'minzoom': 8.6,
      'type': 'fill'
    }, 'admin')

    map.addSource('provinces', {
      'type': 'vector',
      'url': 'mapbox://thinkdatasci.dw2nwjoi'
    })
    map.addLayer({
      'id': 'provinces',
      'source': 'provinces',
      'source-layer': 'final-prov-indicators-d637x8',
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
  map.scrollZoom.disable()
}
