export const needs = {

  'food': {
    'color': '#86c440',
    'titles': 'Food and Land Reform',
    'select-logo-path': '/static/img/01-food-select.png',
    'unselect-logo-path': '/static/img/01-food-unselect.png',
    'explanation': 'Proportion of farmers with insecure tenure',
    'unit': '% of farmers with insecure tenure',
    'kpi': '50.8%',
    'min': 0,
    'indicators': ['food_tenure', 'food_malnourished'],
    'prop-col': 'food_tenure'
  },

  'water': {
    'color': '#438cca',
    'titles': 'Water and Sanitation',
    'select-logo-path': '/static/img/06-water-select.png',
    'unselect-logo-path': '/static/img/06-water-unselect.png',
    'explanation': 'Proportion of households without access to improved sources of drinking water',
    'unit': '% of households have no access to improved sources of drinking water',
    'kpi': '25.6%',
    'min': 0,
    'indicators': ['water_access', 'water_toilet'],
    'prop-col': 'water_access'
  },

  'shelter': {
    'color': '#f5bb18',
    'titles': 'Shelter',
    'select-logo-path': '/static/img/02-shelter-select.png',
    'unselect-logo-path': '/static/img/02-shelter-unselect.png',
    'explanation': 'Proportion of households who are informal settlers',
    'unit': '% of households who are informal settlers',
    'kpi': '3.4%',
    'min': 0,
    'indicators': ['shelter_informal_settlers_nhts', 'shelter_electricity', 'shelter_makeshift_nhts'],
    'prop-col': 'shelter_informal_settlers_nhts'
  },

  'work': {
    'color': '#a03054',
    'titles': 'Work',
    'select-logo-path': '/static/img/07-work-select.png',
    'unselect-logo-path': '/static/img/07-work-unselect.png',
    'explanation': 'Unemployment Rate',
    'unit': '%',
    'kpi': '49.2%',
    'min': 36,
    'indicators': ['work_unemployment', 'work_farms', 'work_unskilled'],
    'prop-col': 'work_unemployment'
  },

  'health': {
    'color': '#e74b36',
    'titles': 'Health',
    'select-logo-path': '/static/img/03-health-select.png',
    'unselect-logo-path': '/static/img/03-health-unselect.png',
    'explanation': 'Proportion of individuals not attending a health care center',
    'unit': '% of individuals not attending a health care center',
    'kpi': '61.9%',
    'min': 22,
    'indicators': ['health_center_attendance', 'health_programs'],
    'prop-col': 'health_center_attendance'
  },

  'education': {
    'color': '#177c9f',
    'titles': 'Education',
    'select-logo-path': '/static/img/08-education-select.png',
    'unselect-logo-path': '/static/img/08-education-unselect.png',
    'explanation': 'Proportion of children 6-16 years old who are not attending school',
    'unit': '% of children not attending school',
    'kpi': '9.9%',
    'min': 2,
    'indicators': ['educ_outofschool_all'],
    'prop-col': 'educ_outofschool_all'
  },

  'protect': {
    'color': '#f7903d',
    'titles': 'Social Protection',
    'select-logo-path': '/static/img/04-protect-select.png',
    'unselect-logo-path': '/static/img/04-protect-unselect.png',
    'explanation': 'Number/Proportion of individuals with SSS / GSIS',
    'unit': '% have SSS / GSIS',
    'kpi': '98.1%',
    'min': 0,
    'indicators': ['sp_sss', 'sp_philhealth'],
    'prop-col': 'sp_sss'
  },

  'environment': {
    'color': '#d4d639',
    'titles': 'Healthy Environment',
    'select-logo-path': '/static/img/09-environment-select.png',
    'unselect-logo-path': '/static/img/09-environment-unselect.png',
    'explanation': 'Combined risk score of various natural disasters',
    'unit': '',
    'kpi': '11.2',
    'min': 1,
    'indicators': ['he_risk'],
    'prop-col': 'he_risk'
  },

  'peace': {
    'color': '#10b9cd',
    'titles': 'Peace and Order',
    'select-logo-path': '/static/img/05-peace-select.png',
    'unselect-logo-path': '/static/img/05-peace-unselect.png',
    'explanation': 'Displacement',
    'unit': '',
    'kpi': '9.3%',
    'min': 0,
    'indicators': ['po_conflict'],
    'prop-col': 'po_conflict'
  },

  'participation': {
    'color': '#a09288',
    'titles': 'Participation',
    'select-logo-path': '/static/img/10-participation-select.png',
    'unselect-logo-path': '/static/img/10-participation-unselect.png',
    'explanation': 'Attendance rate in the last barangay assembly',
    'unit': '% attendance',
    'kpi': '92.1%',
    'min': 0,
    'indicators': ['participation_assembly_attendance', 'participation_turnout', 'participation_coop'],
    'prop-col': 'participation_assembly_attendance'
  }
}

export const indicators = {
  food: {
    need: 'Food and Land Reform',
    label: 'Insecure Farmer Tenure',
    main_col: '#86c440',
    paint: {
      'fill-color': [ 'case',
        [ '==', [ 'get', 'Food_Prop' ], null ], '#ededed',
        [ '!=', [ 'get', 'Food_Prop' ], null ], '#86c440', '#ededed' ],
      'fill-opacity': {
        'barangays': [ 'interpolate', [ 'linear' ], [ 'get', 'Food_Prop' ], 0, 0, 100, 1 ],
        'municities': [ 'interpolate', [ 'linear' ], [ 'get', 'Food_Prop' ], 0, 0, 100, 1 ],
        'provinces': [ 'interpolate', [ 'linear' ], [ 'get', 'Food_Prop' ], 16.2921, 0, 83.3187, 1 ] },
      'fill-outline-color': 'white' }
  },
  water: {
    need: 'Water and Sanitation',
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
  shelter: {
    need: 'Shelter',
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
  },
  health: {
    need: 'Health',
    label: 'Health Care Center Non-Attendance',
    main_col: '#e74b36',
    paint: {
      'fill-color': [ 'case',
        [ '==', [ 'get', 'Health_Prop' ], null ], '#ededed',
        [ '!=', [ 'get', 'Health_Prop' ], null ], '#e74b36', '#ededed' ],
      'fill-opacity': {
        'barangays': [ 'interpolate', [ 'linear' ], [ 'get', 'Health_Prop' ], 0, 0, 100, 1 ],
        'municities': [ 'interpolate', [ 'linear' ], [ 'get', 'Health_Prop' ], 1.143889, 0, 99.84029, 1 ],
        'provinces': [ 'interpolate', [ 'linear' ], [ 'get', 'Health_Prop' ], 22.4498, 0, 91.2211, 1 ] },
      'fill-outline-color': 'white' }
  },
  education: {
    need: 'Education',
    label: 'Out of School',
    main_col: '#177c9f',
    paint: {
      'fill-color': [ 'case',
        [ '==', [ 'get', 'Education_Prop' ], null ], '#ededed',
        [ '!=', [ 'get', 'Education_Prop' ], null ], '#177c9f', '#ededed' ],
      'fill-opacity': {
        'barangays': [ 'interpolate', [ 'linear' ], [ 'get', 'Education_Prop' ], 0, 0, 100, 1 ],
        'municities': [ 'interpolate', [ 'linear' ], [ 'get', 'Education_Prop' ], 0, 0, 82.914259, 1 ],
        'provinces': [ 'interpolate', [ 'linear' ], [ 'get', 'Education_Prop' ], 2.0654, 0, 32.28129, 1 ] },
      'fill-outline-color': 'white' }
  },
  work: {
    need: 'Work',
    label: 'Unemployment Rate',
    main_col: '#a03054',
    paint: {
      'fill-color': [ 'case',
        [ '==', [ 'get', 'Work_Prop' ], null ], '#ededed',
        [ '!=', [ 'get', 'Work_Prop' ], null ], '#a03054', '#ededed' ],
      'fill-opacity': {
        'barangays': [ 'interpolate', [ 'linear' ], [ 'get', 'Work_Prop' ], 0, 0, 100, 1 ],
        'municities': [ 'interpolate', [ 'linear' ], [ 'get', 'Work_Prop' ], 6.451613, 0, 72.229487, 1 ],
        'provinces': [ 'interpolate', [ 'linear' ], [ 'get', 'Work_Prop' ], 36.30473, 0, 62.17391, 1 ] },
      'fill-outline-color': 'white' }
  },
  protect: {
    need: 'Social Protection',
    label: 'SSS Non-Availment',
    main_col: '#f7903d',
    paint: {
      'fill-color': [ 'case',
        [ '==', [ 'get', 'SocialProtection_Prop' ], null ], '#ededed',
        [ '!=', [ 'get', 'SocialProtection_Prop' ], null ], '#f7903d', '#ededed' ],
      'fill-opacity': {
        'barangays': [ 'interpolate', [ 'linear' ], [ 'get', 'SocialProtection_Prop' ], 0, 0, 100, 1 ],
        'municities': [ 'interpolate', [ 'linear' ], [ 'get', 'SocialProtection_Prop' ], 91.66117, 0, 99.9569, 1 ],
        'provinces': [ 'interpolate', [ 'linear' ], [ 'get', 'SocialProtection_Prop' ], 95.31721, 0, 99.66458, 1 ] },
      'fill-outline-color': 'white' }
  },
  peace: {
    need: 'Peace',
    label: 'Displacement',
    main_col: '#10b9cd',
    paint: {
      'fill-color': [ 'case',
        [ '==', [ 'get', 'Peace_Prop' ], null ], '#ededed',
        [ '!=', [ 'get', 'Peace_Prop' ], null ], '#10b9cd', '#ededed' ],
      'fill-opacity': {
        'barangays': [ 'interpolate', [ 'linear' ], [ 'get', 'Peace_Prop' ], 0, 0, 100, 1 ],
        'municities': [ 'interpolate', [ 'linear' ], [ 'get', 'Peace_Prop' ], 0, 0, 92.9334, 1 ],
        'provinces': [ 'interpolate', [ 'linear' ], [ 'get', 'Peace_Prop' ], 0.4685, 0, 48.83817, 1 ] },
      'fill-outline-color': 'white' }
  },
  participation: {
    need: 'Participation',
    label: 'Barangay Assembly Non-Attendance',
    main_col: '#a09288',
    paint: {
      'fill-color': [ 'case',
        [ '==', [ 'get', 'Participation_Prop' ], null ], '#ededed',
        [ '!=', [ 'get', 'Participation_Prop' ], null ], '#a09288', '#ededed' ],
      'fill-opacity': {
        'barangays': [ 'interpolate', [ 'linear' ], [ 'get', 'Participation_Prop' ], 0, 0, 100, 1 ],
        'municities': [ 'interpolate', [ 'linear' ], [ 'get', 'Participation_Prop' ], 57.12506, 0, 99.79317, 1 ],
        'provinces': [ 'interpolate', [ 'linear' ], [ 'get', 'Participation_Prop' ], 84.72165, 0, 98.9982, 1 ] },
      'fill-outline-color': 'white' }
  },
  environment: {
    need: 'Healthy Environment',
    label: 'Risk Score',
    main_col: '#d4d639',
    paint: {
      'fill-color': [ 'case',
        [ '==', [ 'get', 'Environment_Prop' ], null ], '#ededed',
        [ '!=', [ 'get', 'Environment_Prop' ], null ], '#d4d639', '#ededed' ],
      'fill-opacity': {
        'barangays': [ 'interpolate', [ 'linear' ], [ 'get', 'Environment_Prop' ], 0, 0, 100, 1 ],
        'municities': [ 'interpolate', [ 'linear' ], [ 'get', 'Environment_Prop' ], 0, 0, 100, 1 ],
        'provinces': [ 'interpolate', [ 'linear' ], [ 'get', 'Environment_Prop' ], 1.697114, 0, 38.12232, 1 ] },
      'fill-outline-color': 'white' }
  }
}
