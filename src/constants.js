export const needs = {

  'food': {
    'color': '#86c440',
    'titles': 'Food and Land Reform',
    'select-logo-path': '/static/img/01-food-select.png',
    'unselect-logo-path': '/static/img/01-food-unselect.png',
    'explanation': 'Food explanation here',
    'kpi': '70%',
    'indicators': []
  },

  'water': {
    'color': '#438cca',
    'titles': 'Water and Sanitation',
    'select-logo-path': '/static/img/06-water-select.png',
    'unselect-logo-path': '/static/img/06-water-unselect.png',
    'explanation': 'Water explanation here',
    'kpi': '70%',
    'indicators': ['water_toilet', 'water_access']
  },

  'shelter': {
    'color': '#f5bb18',
    'titles': 'Shelter',
    'select-logo-path': '/static/img/02-shelter-select.png',
    'unselect-logo-path': '/static/img/02-shelter-unselect.png',
    'explanation': 'Shelter explanation here',
    'kpi': '70%',
    'indicators': ['shelter_electricity', 'shelter_informal_settlers_nhts', 'shelter_makeshift_nhts']
  },

  'work': {
    'color': '#a03054',
    'titles': 'Work',
    'select-logo-path': '/static/img/07-work-select.png',
    'unselect-logo-path': '/static/img/07-work-unselect.png',
    'explanation': 'Work explanation here',
    'kpi': '70%',
    'indicators': ['work_unemployment', 'work_farms', 'work_unskilled']
  },

  'health': {
    'color': '#e74b36',
    'titles': 'Health',
    'select-logo-path': '/static/img/03-health-select.png',
    'unselect-logo-path': '/static/img/03-health-unselect.png',
    'explanation': 'Health explanation here',
    'kpi': '70%',
    'indicators': ['health_center_attendance', 'health_programs']
  },

  'education': {
    'color': '#177c9f',
    'titles': 'Education',
    'select-logo-path': '/static/img/08-education-select.png',
    'unselect-logo-path': '/static/img/08-education-unselect.png',
    'explanation': 'Education explanation here',
    'kpi': '70%',
    'indicators': ['educ_outofschool_all']
  },

  'protect': {
    'color': '#f7903d',
    'titles': 'Social Protection',
    'select-logo-path': '/static/img/04-protect-select.png',
    'unselect-logo-path': '/static/img/04-protect-unselect.png',
    'explanation': 'Protection explanation here',
    'kpi': '70%',
    'indicators': ['sp_philhealth']
  },

  'environment': {
    'color': '#d4d639',
    'titles': 'Healthy Environment',
    'select-logo-path': '/static/img/09-environment-select.png',
    'unselect-logo-path': '/static/img/09-environment-unselect.png',
    'explanation': 'Environment explanation here',
    'kpi': '70%',
    'indicators': []
  },

  'peace': {
    'color': '#10b9cd',
    'titles': 'Peace and Order',
    'select-logo-path': '/static/img/05-peace-select.png',
    'unselect-logo-path': '/static/img/05-peace-unselect.png',
    'explanation': 'Peace explanation here',
    'kpi': '70%',
    'indicators': ['po_conflict']
  },

  'participation': {
    'color': '#a09288',
    'titles': 'Participation',
    'select-logo-path': '/static/img/10-participation-select.png',
    'unselect-logo-path': '/static/img/10-participation-unselect.png',
    'explanation': 'Participation explanation here',
    'kpi': '70%',
    'indicators': []
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

export const indicator_descriptions = {
  'food_malnourished' : 'Proportion of children 0-5 years old who are malnourished (up to barangay level)',
  'food_tenure' : 'Proportion of farmers with insecure tenure (up to barangay level)',
  'water_access' : 'Proportion of households without access to improved sources of drinking water (up to barangay level)',
  'water_toilet' : 'Proportion of households without access to sanitary toilet facilities (up to barangay level)',
  'water_system_access' : 'Access of barangay to community waterworks system (CWS)',
  'shelter_makeshift_nhts' : 'Proportion of households living in makeshift housing (up to barangay level)',
  'shelter_makeshift_cbms' : 'Proportion of households living in makeshift housing (up to barangay level)',
  'shelter_informal_settlers_nhts' : 'Proportion of households who are informal settlers (up to barangay level)',
  'shelter_informal_settlers_cbms' : 'Proportion of households who are informal settlers',
  'shelter_electricity' : 'Proportion of households without access to electricity (up to barangay level)',
  'health_center_attendance' : 'Proportion of individuals not attending a health care center (up to barangay level)',
  'health_programs' : 'Proportion of households which did not receive PhilHealth support from government/LGU/NGO (up to barangay level)',
  'health_child_mortality' : 'Proportion of children 0 to 5 years old who died',
  'health_maternal_death' : 'Proportion of women who died due to pregnancy related causes',
  'health_center_access' : 'Access of barangay to puericulture center or barangay health center/station (PC/BHS)?',
  'health_hospital_access' : 'Access of barangay to hospital?',
  'educ_outofschool_6' : 'Proportion of children 6-12 years old who are not attending school (up to barangay level)',
  'educ_outofschool_13' : 'Proportion of children 13-16 years old who are not attending school (up to barangay level)',
  'educ_outofschool_all' : 'Proportion of children 6-16 years old who are not attending school (up to barangay level)',
  'educ_elem_access' : 'Access of barangay to elementary school?',
  'educ_hs_access' : 'Access of barangay to high school?',
  'work_unemployment' : 'Unemployment Rate (up to barangay level)',
  'work_farms' : 'Proportion of individuals who are farmers, forestry workers, or fisherfolks (up to barangay level)',
  'work_unskilled' : 'Proportion of individuals who are laborers and unskilled workers (up to barangay level)',
  'sp_sss' : 'Number/Proportion of individuals with SSS / GSIS (up to barangay level)',
  'sp_philhealth' : 'Number/Proportion of households which received PhilHealth, Pantawid, and other Cash Transfers from government/LGU/NGO (up to barangay level)',
  'po_crime' : 'Number/Proportion of persons who are victims of crimes (up to barangay level)',
  'po_conflict' : 'Number/Proportion of households affected by armed conflict (up to barangay level)',
  'participation_registration' : 'Registration rate among eligible voters (up to barangay level)',
  'participation_turnout' : 'Voter turnout rate in the last elections (up to barangay level)',
  'participation_assembly_attendance' : 'Attendance rate in the last barangay assembly',
  'participation_coop' : 'Proportion of population who are members of cooperatives (up to municipal level)',
  'he_flood' : 'Proportion of households living in areas with risk of flooding (up to municipal level)',
  'he_landslide' : 'Proportion of households living in areas with risk of landslide (up to municipal level',
  'he_volcano' : 'Risk of barangay to volcano eruption (up to barangay level)',
  'he_earthquake' : 'Risk of barangay to earthquake (up to barangay level)'
}
