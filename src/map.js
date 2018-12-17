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

    map.addSource('prov-outline', {
      'type': 'vector',
      'url': 'mapbox://napc.6alfq7df'
    })
    map.addLayer({
      'id': 'prov-outline',
      'source': 'prov-outline',
      'source-layer': 'province_outlines-01muq5',
      'type': 'line',
      "paint": {
            "line-color": "#EF4631",
            "line-opacity": 0.5,
            "line-width": 1.5
        }
    }, 'admin')

    map.addSource('mun-outline', {
      'type': 'vector',
      'url': 'mapbox://napc.bg5dnk38'
    })
    map.addLayer({
      'id': 'mun-outline',
      'source': 'mun-outline',
      'source-layer': 'municipality_outlines-a9rg3m',
      'type': 'line',
      "paint": {
            "line-color": "#10B9CE",
            "line-opacity": 0.5,
            "line-width": 1.5
        }
    }, 'admin')

    map.setLayoutProperty('provinces', 'visibility', 'visible')
    map.setLayoutProperty('municities', 'visibility', 'none')
    map.setLayoutProperty('barangays', 'visibility', 'none')
    map.setLayoutProperty('prov-outline', 'visibility', 'none')
    map.setLayoutProperty('mun-outline', 'visibility', 'none')
  })

  function zoomOnClick () {
    map.on('click', 'provinces', function (e) {
      const bbox = turf.bbox(e.features[0])
      map.fitBounds(bbox, { padding: 150 })
      map.setLayoutProperty('provinces', 'visibility', 'none')
      map.setLayoutProperty('municities', 'visibility', 'visible')
      map.setLayoutProperty('prov-outline', 'visibility', 'none')

    })
    map.on('click', 'municities', function (e) {
      const bbox = turf.bbox(e.features[0])
      map.fitBounds(bbox, { padding: 200 })
      map.setLayoutProperty('municities', 'visibility', 'none')
      map.setLayoutProperty('barangays', 'visibility', 'visible')
      map.setLayoutProperty('prov-outline', 'visibility', 'none')
      map.setLayoutProperty('mun-outline', 'visibility', 'none')
    })
  }
  map.on('load', zoomOnClick)
  map.scrollZoom.disable()
}
