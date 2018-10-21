import 'mapbox-gl/dist/mapbox-gl.css'

const indicators = [
  { need: 'Water and Sanitation',
    id: 'water',
    label: 'Drinking Water Access',
    main_col: '#438cca',
    paint: {
      'fill-color': [ 'case',
        [ '==', [ 'get', 'Water_Prop' ], null ], '#ededed',
        [ '!=', [ 'get', 'Water_Prop' ], null ], '#438cca', '#ededed' ],
      'fill-opacity': {
        'barangays': [ 'interpolate', [ 'linear' ], [ 'get', 'Water_Prop' ], 0, 0, 100, 1 ],
        'municities': [ 'interpolate', [ 'linear' ], [ 'get', 'Water_Prop' ], 0, 0, 98.924941, 1 ],
        'provinces': [ 'interpolate', [ 'linear' ], [ 'get', 'Water_Prop' ], 0.74839, 0, 83.8662, 1 ] },
      'fill-outline-color': 'white' }
  }
]

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
      'minzoom': 8,
      'maxzoom': 10,
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
      'minzoom': 10,
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
      'maxzoom': 8,
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
    map.setPaintProperty('municities', 'fill-outline-color', indicator.paint['fill-outline-color'])
    map.setPaintProperty('barangays', 'fill-outline-color', indicator.paint['fill-outline-color'])
    map.setPaintProperty('provinces', 'fill-outline-color', indicator.paint['fill-outline-color'])

    map.setPaintProperty('municities', 'fill-color', indicator.paint['fill-color'])
    map.setPaintProperty('barangays', 'fill-color', indicator.paint['fill-color'])
    map.setPaintProperty('provinces', 'fill-color', indicator.paint['fill-color'])

    map.setPaintProperty('municities', 'fill-opacity', indicator.paint['fill-opacity']['municities'])
    map.setPaintProperty('barangays', 'fill-opacity', indicator.paint['fill-opacity']['barangays'])
    map.setPaintProperty('provinces', 'fill-opacity', indicator.paint['fill-opacity']['provinces'])
  }

  map.on('load', showIndicator)
}
