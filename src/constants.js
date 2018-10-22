export const needs = {

  'food': {
    'color': '#86c440',
    'titles': 'Food and Land Reform',
    'select-logo-path': '/static/img/01-food-select.png',
    'unselect-logo-path': '/static/img/01-food-unselect.png',
    'explanation': 'Food explanation here',
    'kpi': '70%'
  },

  'water': {
    'color': '#438cca',
    'titles': 'Water and Sanitation',
    'select-logo-path': '/static/img/06-water-select.png',
    'unselect-logo-path': '/static/img/06-water-unselect.png',
    'explanation': 'Water explanation here',
    'kpi': '70%'
  },

  'shelter': {
    'color': '#f5bb18',
    'titles': 'Shelter',
    'select-logo-path': '/static/img/02-shelter-select.png',
    'unselect-logo-path': '/static/img/02-shelter-unselect.png',
    'explanation': 'Shelter explanation here',
    'kpi': '70%'
  },

  'work': {
    'color': '#a03054',
    'titles': 'Work',
    'select-logo-path': '/static/img/07-work-select.png',
    'unselect-logo-path': '/static/img/07-work-unselect.png',
    'explanation': 'Work explanation here',
    'kpi': '70%'
  },

  'health': {
    'color': '#e74b36',
    'titles': 'Health',
    'select-logo-path': '/static/img/03-health-select.png',
    'unselect-logo-path': '/static/img/03-health-unselect.png',
    'explanation': 'Health explanation here',
    'kpi': '70%'
  },

  'education': {
    'color': '#177c9f',
    'titles': 'Education',
    'select-logo-path': '/static/img/08-education-select.png',
    'unselect-logo-path': '/static/img/08-education-unselect.png',
    'explanation': 'Education explanation here',
    'kpi': '70%'
  },

  'protect': {
    'color': '#f7903d',
    'titles': 'Social Protection',
    'select-logo-path': '/static/img/04-protect-select.png',
    'unselect-logo-path': '/static/img/04-protect-unselect.png',
    'explanation': 'Protection explanation here',
    'kpi': '70%'
  },

  'environment': {
    'color': '#d4d639',
    'titles': 'Healthy Environment',
    'select-logo-path': '/static/img/09-environment-select.png',
    'unselect-logo-path': '/static/img/09-environment-unselect.png',
    'explanation': 'Environment explanation here',
    'kpi': '70%'
  },

  'peace': {
    'color': '#10b9cd',
    'titles': 'Peace and Order',
    'select-logo-path': '/static/img/05-peace-select.png',
    'unselect-logo-path': '/static/img/05-peace-unselect.png',
    'explanation': 'Peace explanation here',
    'kpi': '70%'
  },

  'participation': {
    'color': '#a09288',
    'titles': 'Participation',
    'select-logo-path': '/static/img/10-participation-select.png',
    'unselect-logo-path': '/static/img/10-participation-unselect.png',
    'explanation': 'Participation explanation here',
    'kpi': '70%'
  }
}

export const indicators = [
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
  },
  { need: 'Shelter',
    id: 'shelter',
    label: 'Informal Settlers',
    main_col: '#f5bb18',
    paint: {
      'fill-color': [ 'case',
        [ '==', [ 'get', 'Shelter_Prop' ], null ], '#ededed',
        [ '!=', [ 'get', 'Shelter_Prop' ], null ], '#f5bb18', '#ededed' ],
      'fill-opacity': {
        'barangays': [ 'interpolate', [ 'linear' ], [ 'get', 'Shelter_Prop' ], 0, 0, 100, 1 ],
        'municities': [ 'interpolate', [ 'linear' ], [ 'get', 'Shelter_Prop' ], 0, 0, 51.645035, 1 ],
        'provinces': [ 'interpolate', [ 'linear' ], [ 'get', 'Shelter_Prop' ], 0.39201, 0, 12.36044, 1 ] },
      'fill-outline-color': 'white' }
  }
]
