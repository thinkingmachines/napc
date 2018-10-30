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
      data.forEach(d => {
        Object.keys(this.state).forEach(k => {
          this.setState({
            [k]: this.state[k]
              .concat({
                'Pro_Code': d.Pro_Code, 'Pro_Name': d.Pro_Name, 'Reg_Name': d.Reg_Name, 'score': d[k]
              })
              .sort(function (a, b) {
                return a.score - b.score
              })
          })
        })
      })
    })
  }
  componentDidUpdate (prevProps) {
    if (prevProps.need !== this.props.need) {
      console.log('Do something with need: ', this.props.need)
    }
  }
  render () {
    console.log(this.state)
    console.log(this.state[this.props.need])
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
            <ResponsiveOrdinalFrame
              responsiveWidth
              responsiveHeight
              data={this.state[this.props.need]}
              oAccessor={'Pro_Code'}
              rAccessor={'score'}
              margin={{ top: 0, bottom: 0, left: 0, right: 5 }}
              type={'bar'}
              oPadding={5}
              style={{ fill: needs[this.props.need].color }}
              baseMarkProps={{ forceUpdate: true }}
              pieceHoverAnnotation
              tooltipContent={d => <div className='tooltip-content'>
                <p>{d.Pro_Name}</p>
                <p>{d.score}</p>
              </div>}
            />
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

  .information{
    width:40%;
    background: white;
    padding: 1.5vw;
    opacity:  0.95;
  }
  .need-header{
    margin:0;
    margin-bottom:0.75vh;
    font-family: 'Akrobat';
    font-size:2vh;
  }
  .need-text {
    font-family: 'Akrobat';
    font-weight: bold;
    font-size: 3.5vh;
    padding: 0 0 10vh 0;
    width: 100%;
    margin:0;
    color: ${props => needs[props.need].color};
  }
  .need-body{
    font-family: 'Proxima Nova';
    font-size: 1.75vh;
    font-style: none !important;
    padding-right: 0;
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
`
