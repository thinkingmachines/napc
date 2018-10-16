import React, { Component } from 'react'
import styled from 'styled-components'
import { OrdinalFrame } from 'semiotic'
import { needs } from '../constants'

const barChartData = {
  'food': [
    { municipality: '6', score: 0.5 },
    { municipality: '4', score: 0.8 },
    { municipality: '3', score: 0.2 },
    { municipality: '1', score: 0.9 }
  ],
  'water': [
    { municipality: '6', score: 0.5 },
    { municipality: '4', score: 0.6 },
    { municipality: '3', score: 0.3 },
    { municipality: '1', score: 0.1 }
  ],
  'shelter': [
    { municipality: '6', score: 0.8 },
    { municipality: '4', score: 0.2 },
    { municipality: '3', score: 0.4 },
    { municipality: '1', score: 0.6 }
  ],
  'work': [
    { municipality: '6', score: 0.1 },
    { municipality: '4', score: 0.9 },
    { municipality: '3', score: 0.6 },
    { municipality: '1', score: 0.2 }
  ],
  'health': [
    { municipality: '6', score: 0.1 },
    { municipality: '4', score: 0.4 },
    { municipality: '3', score: 0.6 },
    { municipality: '1', score: 0.2 }
  ],
  'education': [
    { municipality: '6', score: 0.1 },
    { municipality: '4', score: 0.4 },
    { municipality: '3', score: 0.3 },
    { municipality: '1', score: 0.2 }
  ],
  'protect': [
    { municipality: '6', score: 0.1 },
    { municipality: '4', score: 0.7 },
    { municipality: '3', score: 0.1 },
    { municipality: '1', score: 0.8 }
  ],
  'environment': [
    { municipality: '6', score: 0.9 },
    { municipality: '4', score: 0.1 },
    { municipality: '3', score: 0.5 },
    { municipality: '1', score: 0.9 }
  ],
  'peace': [
    { municipality: '6', score: 0.5 },
    { municipality: '4', score: 0.8 },
    { municipality: '3', score: 0.2 },
    { municipality: '1', score: 0.9 }
  ],
  'participation': [
    { municipality: '6', score: 0.5 },
    { municipality: '4', score: 0.8 },
    { municipality: '3', score: 0.2 },
    { municipality: '1', score: 0.9 }
  ]
}

class Overlay extends Component {
  componentDidUpdate (prevProps) {
    const { need } = this.props.match.params
    if (prevProps.match.params.need !== need) {
      console.log('Do something with need: ', need)
    }
  }
  render () {
    return (
      <div className={this.props.className}>
        <div className='information'>
          <p className='need-header'>Basic Need</p>
          <p className='need-text'>
            {needs[this.props.need].titles}
          </p>
          <p className='need-body'>
            {needs[this.props.need].explanation}
          </p>
          <div className='horiz-dotted' />
          <p className='kpi'>
            {needs[this.props.need].kpi}
          </p>
          <div className='chart'>
            <OrdinalFrame
              size={[150, 50]}
              data={barChartData[this.props.need]}
              oAccessor={'municipality'}
              rAccessor={'score'}
              type={'bar'}
              oPadding={5}
              style={{ fill: needs[this.props.need].color }}
              baseMarkProps={{ forceUpdate: true }}
            />
            <svg height={20}>
              <rect className='divider' style={{ height: '0.2vh', width: 150, fill: '#999999' }} />
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

export default styled(Overlay)`
  position:absolute;
  top:0;
  left:0;
  font-family: 'Akrobat';
  font-weight: bold;
  font-size: 2vh;
  color: #464646;
  padding-left: 3vw;
  display: inline-block;
  flex-grow: 20;

  .information{
    width:11vw;
    background: white;
    padding: 2vw;
    opacity:  0.8;
  }

  .need-header{
    margin:0;
    margin-bottom:0.75vh;
  }

  .need-text {
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 3.5vh;
    flex-wrap: wrap;
    padding-right: 10vw;
    width:20vh;
    height: 15vh;
    margin:0;
    line-height:90%
    color: ${props => needs[props.need].color};
  }

  .need-body{
    font-family: 'Akrobat';
    font-size: 1.75vh;
    font-style: none !important;
    flex-wrap: wrap;
    padding-right: 0;
    color: #999999;
    line-height:90%;
    text-align:justify;
    margin-top:0;
  }

  .need-body-p{
    margin-top:1vh;
  }

  .horiz-dotted {
    margin-top:1.5vh;
    border-bottom: 2px dashed #999999;
    width: 20vh;
  }

  .kpi{
    font-size: 4.5vh;
    margin-top:1.5vh;
    margin-bottom:1vh;
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 3.5vh;
    color: ${props => needs[props.need].color};
  }
`
