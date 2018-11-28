import React, { Component } from 'react'
import styled from 'styled-components'
import { ResponsiveOrdinalFrame } from 'semiotic'
import { needs } from '../constants'
import * as d3 from 'd3'

class Overlay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'food': [],
      'water': [],
      'shelter': [],
      'work': [],
      'health': [],
      'education': [],
      'protect': [],
      'environment': [],
      'peace': [],
      'participation': []
    }
  }
  componentDidMount () {
    d3.csv('../static/data/final-prov-indicators.csv').then(data => {
      const state = {}
      data.forEach(d => {
        Object.keys(this.state).forEach(k => {
          state[k] = (state[k] || this.state[k])
            .concat({
              'Pro_Code': d.Pro_Code, 'Pro_Name': d.Pro_Name, 'Reg_Name': d.Reg_Name, 'score': d[k]
            })
            .sort(function (a, b) {
              return a.score - b.score
            })
        })
      })
      this.setState(state)
    })
  }
  render () {
    return (
      <div className={this.props.className}>
        <div className='information'>
          <p className='need-header'>Basic Need</p>
          <p className='need-text'>
            {needs[this.props.need].titles}
          </p>
          <svg width="100%" height="10" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <text text-anchor="start" x="0%" y="10" className='need-body'>0%</text>
            <text text-anchor="end" x="100%" y="10" className='need-body'>100%</text>
          </svg>
          <svg width="100%" height="10" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="legendColor" x1="0" x2="1">
                <stop offset="0%" stop-color="#ededed"/>
                <stop offset="100%" stop-color={needs[this.props.need].color}/>
              </linearGradient>
            </defs>
            <rect id="rect1" x1="0%" x2="100%" width="100%" height="10"/>
            <rect x1="0%" x2="100%" width="100%" height="10" fill="url(#legendColor)"/>
          </svg>
          <p className='need-body'>
            {needs[this.props.need].explanation}
          </p>
          <div className='horiz-dotted' />
          <p className='kpi'>
            {needs[this.props.need].kpi}
          </p>
          <div className='chart'>
            <ResponsiveOrdinalFrame
              responsiveWidth
              responsiveHeight
              data={this.state[this.props.need]}
              oAccessor={'Pro_Code'}
              rAccessor={d => d.score - (d.score > 0 ? needs[this.props.need].min : 0)}
              margin={{ top: 0, bottom: 0, left: 0, right: 5 }}
              type={'bar'}
              oPadding={5}
              style={{ fill: needs[this.props.need].color }}
              baseMarkProps={{ forceUpdate: true }}
              pieceHoverAnnotation
              tooltipContent={d => <div className='tooltip-content'>
                <p>{d.Pro_Name}: {Math.round(d.score * 100) / 100}{needs[this.props.need].unit}</p>
              </div>}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default styled(Overlay)`
  font-family: 'Akrobat';
  font-weight: bold;
  font-size: 2vh;
  color: #464646;
  padding-left: 3vw;
  display: inline-block;
  top: 0;
  left: 0;
  position: absolute;

  .information{
    width: 25vw;
    background: white;
    padding: 4vw;
    opacity:  0.95;
  }

  .need-header{
    margin:0;
    margin-bottom:0.75vh;
    font-family: 'Akrobat';
    font-size:2vh;
  }

  @media only screen and (min-width: 768px) {
    .information{
      width: 10vw;
      padding: 1.5vw;
    }
  }

  .need-text {
    font-family: 'Akrobat';
    font-weight: bold;
    font-size: 3.5vh;
    padding: 0 0 5vh 0;
    width: 100%;
    margin:0;
    color: ${props => needs[props.need].color};
  }

  .need-body{
    font-family: 'Proxima Nova';
    font-size: 1.75vh;
    font-style: none !important;
    padding: 20px 0 0 0;
    color: #999999;
    margin-top:0;
  }

  .need-body-p{
    margin-top:1vh;
  }

  .horiz-dotted {
    margin-top:1.5vh;
    border-bottom: 1px dashed #999999;
    width: 100%;
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

  .chart{
    width: 100%;
    height: 8vh;
    border-bottom: 1.5px solid #999999;
  }

  .tooltip-content {
    background: white;
    color: ${props => needs[props.need].color};
    padding: 2px 10px 2px 10px;
    z-index: 99;
    min-width: 120px;
  }
`
