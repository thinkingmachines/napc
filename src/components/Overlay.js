import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { OrdinalFrame } from 'semiotic'
import { needs } from '../constants'
import '../static/css/SidebarPage.css'

const barChartData = { '/food': [
  { municipality: '6', score: 0.5 },
  { municipality: '4', score: 0.8 },
  { municipality: '3', score: 0.2 },
  { municipality: '1', score: 0.9 }
],
'/water': [
  { municipality: '6', score: 0.5 },
  { municipality: '4', score: 0.6 },
  { municipality: '3', score: 0.3 },
  { municipality: '1', score: 0.1 }
],
'/shelter': [
  { municipality: '6', score: 0.8 },
  { municipality: '4', score: 0.2 },
  { municipality: '3', score: 0.4 },
  { municipality: '1', score: 0.6 }
],
'/work': [
  { municipality: '6', score: 0.1 },
  { municipality: '4', score: 0.9 },
  { municipality: '3', score: 0.6 },
  { municipality: '1', score: 0.2 }
],
'/health': [
  { municipality: '6', score: 0.1 },
  { municipality: '4', score: 0.4 },
  { municipality: '3', score: 0.6 },
  { municipality: '1', score: 0.2 }
],
'/education': [
  { municipality: '6', score: 0.1 },
  { municipality: '4', score: 0.4 },
  { municipality: '3', score: 0.3 },
  { municipality: '1', score: 0.2 }
],
'/protect': [
  { municipality: '6', score: 0.1 },
  { municipality: '4', score: 0.7 },
  { municipality: '3', score: 0.1 },
  { municipality: '1', score: 0.8 }
],
'/environment': [
  { municipality: '6', score: 0.9 },
  { municipality: '4', score: 0.1 },
  { municipality: '3', score: 0.5 },
  { municipality: '1', score: 0.9 }
],
'/peace': [
  { municipality: '6', score: 0.5 },
  { municipality: '4', score: 0.8 },
  { municipality: '3', score: 0.2 },
  { municipality: '1', score: 0.9 }
],
'/participation': [
  { municipality: '6', score: 0.5 },
  { municipality: '4', score: 0.8 },
  { municipality: '3', score: 0.2 },
  { municipality: '1', score: 0.9 }
] }

class Overlay extends Component {
  componentDidUpdate (prevProps) {
    const { need } = this.props.match.params
    if (prevProps.match.params.need !== need) {
      console.log('Do something with need: ', need)
    }
  }
  render () {
    return (
      <div className='overlay'>
        Basic Need:<br />
        <div className='need-text' style={{ color: needs[this.props.location.pathname]['color'] }} >
          {needs[this.props.location.pathname]['titles']}
          <br />
          <span className='need-body'>{ needs[this.props.location.pathname]['explanation'] }</span>
        </div>
        <div className='horiz-dotted' />
        <div className='chart'>
          <OrdinalFrame
            size={[150, 50]}
            data={barChartData[this.props.location.pathname]}
            oAccessor={'municipality'}
            rAccessor={'score'}
            type={'bar'}
            oPadding={5}
            style={{ fill: needs[this.props.location.pathname]['color'] }}
            baseMarkProps={{ forceUpdate: true }}
          />
          <svg height={20}>
            <rect className='divider' style={{ height: '0.2vh', width: 150, fill: '#999999' }} />
          </svg>
        </div>
      </div>
    )
  }
}

export default Overlay