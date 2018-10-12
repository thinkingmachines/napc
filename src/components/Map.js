import React, { Component } from 'react'

// const indicators = [
//   {
//     'need': 'Food and Land Reform',
//     'id': 'food1',
//     'label': 'Malnourished Children',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Food and Land Reform',
//     'id': 'food2',
//     'label': 'Insecure Farmer Tenure',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Water and Sanitation',
//     'id': 'water1',
//     'label': 'Drinking Water Access',
//     'paint': {
//       'fill-color': '#10b8cd',
//       'fill-opacity': [ 'interpolate', ['linear'], ['get', 'wo_access_drinking_sources_prop'], 0, 0, 100, 1],
//       'fill-outline-color': 'white'}
//     },
//   {
//     'need': 'Water and Sanitation',
//     'id': 'water2',
//     'label': 'Toilet Access',
//     'paint': {
//       'fill-color': '#10b8cd',
//       'fill-opacity': [ 'interpolate', ['linear'], ['get', 'wo_access_toilet_prop'], 0, 0, 100, 1],
//       'fill-outline-color': 'white'}
//     },
//   {
//     'need': 'Water and Sanitation',
//     'id': 'water3',
//     'label': 'Waterworks System Access',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Shelter',
//     'id': 'shelter1',
//     'label': 'Makeshift Housing',
//     'paint': {
//       'fill-color': '#ff9138',
//       'fill-opacity': [ 'interpolate', ['linear'], ['get', 'salvaged_houses_prop'], 0, 0, 100, 1],
//       'fill-outline-color': 'white'}
//     },
//   {
//     'need': 'Shelter',
//     'id': 'shelter2',
//     'label': 'Informal Settlers',
//     'paint': {
//       'fill-color': '#ff9138',
//       'fill-opacity': [ 'interpolate', ['linear'], ['get', 'squat_prop'], 0, 0, 100, 1],
//       'fill-outline-color': 'white'}
//     },
//   {
//     'need': 'Shelter',
//     'id': 'shelter3',
//     'label': 'Electricity Access',
//     'paint': {
//       'fill-color': '#ff9138',
//       'fill-opacity': [ 'interpolate', ['linear'], ['get', 'no_electricity_prop'], 0, 0, 100, 1],
//       'fill-outline-color': 'white'}
//     },
//   {
//     'need': 'Health',
//     'id': 'health1',
//     'label': 'Health Care Center Attendance',
//     'paint': {
//       'fill-color': '#438bca',
//       'fill-opacity': [ 'interpolate', ['linear'], ['get', 'not_attended_hc_prop'], 0, 0, 100, 1],
//       'fill-outline-color': 'white'}
//     },
//   {
//     'need': 'Health',
//     'id': 'health2',
//     'label': 'Programs and Services Received',
//     'paint': {
//       'fill-color': '#438bca',
//       'fill-opacity': [ 'interpolate', ['linear'], ['get', 'no_serv_received_soc_protection_prop'], 0, 0, 100, 1],
//       'fill-outline-color': 'white'}
//     },
//   {
//     'need': 'Health',
//     'id': 'health3',
//     'label': 'Health Center Access',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Health',
//     'id': 'health4',
//     'label': 'Hospital Access',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Education',
//     'id': 'educ1',
//     'label': 'Children Out of School (6-12 yo)',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Education',
//     'id': 'educ2',
//     'label': 'Children Out of School (13-16 yo)',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Education',
//     'id': 'educ3',
//     'label': 'Children Out of School (6-16 yo)',
//     'paint': {
//       'fill-color': '#e93434',
//       'fill-opacity': [ 'interpolate', ['linear'], ['get', 'not_schooling_prop'], 0, 0, 100, 1],
//       'fill-outline-color': 'white'}
//     },
//   {
//     'need': 'Education',
//     'id': 'educ4',
//     'label': 'Elementary School Access',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Education',
//     'id': 'educ5',
//     'label': 'High School Access',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Work',
//     'id': 'work1',
//     'label': 'Unemployment Rate',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Work',
//     'id': 'work2',
//     'label': 'Farms, Forestry Workers, or Fisherfolks',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Work',
//     'id': 'work3',
//     'label': 'Laborers & Unskilled Workers',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Work',
//     'id': 'work4',
//     'label': 'Predicted Household Income',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Social Protection',
//     'id': 'sp1',
//     'label': 'SSS / GSIS availment',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Social Protection',
//     'id': 'sp2',
//     'label': 'PhilHealth, Pantawid, Cash Transfer support',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Peace and Order',
//     'id': 'po1',
//     'label': 'Crime Victims',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Peace and Order',
//     'id': 'po2',
//     'label': 'Armed Conflict',
//     'paint': {
//       'fill-color': '#f7bb09',
//       'fill-opacity': [ 'interpolate', ['linear'], ['get', 'affected_prop'], 0, 0, 100, 1],
//       'fill-outline-color': 'white'}
//     },
//   {
//     'need': 'Participation',
//     'id': 'participation1',
//     'label': 'Voter Registration Rate',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Participation',
//     'id': 'participation2',
//     'label': 'Voter Turnout Rate',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Participation',
//     'id': 'participation3',
//     'label': 'Barangay Assembly Attendance Rate',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Participation',
//     'id': 'participation4',
//     'label': 'Cooperative Members',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Healthy Environment',
//     'id': 'he1',
//     'label': 'Flood Risk',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Healthy Environment',
//     'id': 'he2',
//     'label': 'Landslide Risk',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Healthy Environment',
//     'id': 'he3',
//     'label': 'Volcano Eruption Risk',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   },
//   {
//     'need': 'Healthy Environment',
//     'id': 'he4',
//     'label': 'Earthquake Risk',
//     'paint': {
//       'fill-color': '#b4b4b4'
//     }
//   }
// ]

class Map extends Component {
  render () {
    return (
      <div id='map' />
    )
  }
}

export default Map
