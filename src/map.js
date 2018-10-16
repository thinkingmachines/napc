import 'mapbox-gl/dist/mapbox-gl.css'

const indicators = [
  { need: 'Water and Sanitation',
    id: 'water1',
    label: 'Drinking Water Access',
    paint: {
      'fill-color': '#10b8cd',
      'fill-opacity': [
        'interpolate', [ 'linear' ], [ 'get', 'wo_access_drinking_sources_prop' ], 0, 0, 100, 1
      ],
      'fill-outline-color': 'white'
    }
  }
]

export function initMap (map) {
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

  // function selectIndicator (id) {
  //   console.log('select indicator runs')
  //   const indicator = indicators.find(function (d) { return d.id === id })
  //   console.log(id)
  //   console.log(indicator)
  //   Object.keys(indicator.paint).forEach(function (property) {
  //     console.log(property)
  //     console.log(indicator.paint[property])
  //     map.setPaintProperty('barangays', property, indicator.paint[property])
  //   })
  // }
  // selectIndicator('water1')

  function showIndicator () {
    const indicator = indicators[0]
    map.setPaintProperty('barangays', 'fill-color', indicator.paint['fill-color'])
    map.setPaintProperty('barangays', 'fill-opacity', indicator.paint['fill-opacity'])
    map.setPaintProperty('barangays', 'fill-outline-color', indicator.paint['fill-outline-color'])
  }

  map.on('load', showIndicator)
}
