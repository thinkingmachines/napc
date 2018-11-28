import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { needs } from '../constants'

import nationalAverages from '../ind-avg.json'

class MunicipalityStripPlot extends Component {
  calculateDataPosition (value) {
    if (value && this.props.axisLabels) {
      return (value - this.props.axisLabels.min) / (this.props.axisLabels.max - this.props.axisLabels.min)
    }
    return -1
  }

  render () {
    if (this.props.axisLabels === null) {
      return null
    }

    if (this.props.axisLabels.min === this.props.axisLabels.max) {
      return null
    }

    return (
      <div>
        <div className='mun-sidebar-chart-desc'>
          {this.props.desc}
        </div>
        <div className='mun-sidebar-chart'>
          <svg width='100%' height='50' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <line x1='10%' x2='90%' y1='calc(50% + 3.5px)' y2='calc(50% + 3.5px)' stroke='#CCC' strokeWidth='1' />
            <line x1='10%' x2='10%' y1='21' y2='calc(100% - 13px)' stroke='#CCC' strokeWidth='1' />
            <line x1='90%' x2='90%' y1='21' y2='calc(100% - 13px)' stroke='#CCC' strokeWidth='1' />
            <line x1='calc(50% - 0.5px)' x2='calc(50% - 0.5px)' y1='21' y2='calc(100% - 13px)' stroke='#CCC' strokeWidth='1' />
            {this.props.indicatorValues.map((chartData, i) => (
              <g
                className='circleGroup'
                key={i}>
                <circle
                  data-barangay={chartData['barangay']}
                  cx={((this.calculateDataPosition(chartData['value']) * 0.8 + 0.1) * 100) + '%'}
                  cy='calc(50% + 2.5px)'
                  fill={needs[this.props.need].color}
                  r='5'
                  opacity={this.props.selected === '' || this.props.selected === chartData['barangay'] ? 0.6 : 0.2} />
                <rect
                  x='calc(50% - 100px)'
                  y='0'
                  width='200px'
                  height='20px' />
                <text
                  x='50%'
                  y='5'
                  textAnchor='middle'
                  alignmentBaseline='hanging' >
                  {chartData['name']}
                </text>
              </g>
            ))}
            <text className='axis-label' x='10%' y='48' textAnchor='middle' alignmentBaseline='baseline'>{this.props.axisLabels.min + '%'}</text>
            <text className='axis-label' x='90%' y='48' textAnchor='middle' alignmentBaseline='baseline'>{this.props.axisLabels.max + '%'}</text>
          </svg>
        </div>
      </div>
    )
  }
}

class MunicipalityScoreChart extends Component {
  render () {
    var scorePos = this.props.scorePos
    var xValLine = scorePos >= 50 ? '50%' : scorePos + '%'
    var xValMarkerNum = scorePos + '%'
    var xValMarker = scorePos >= 50 ? scorePos === 50 ? 'calc(' + xValMarkerNum + ' - 1px)' : 'calc(' + xValMarkerNum + ' - 2px)' : xValMarkerNum
    var lineWidth = Math.abs(scorePos - 50) + '%'

    return (
      <svg width='70' height='20' version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <line x1='calc(50% - 0.5px)' x2='calc(50% - 0.5px)' y1='0' y2='100%' stroke='#CCC' strokeWidth='1' />
        <rect x={xValLine} y='8.5' width={lineWidth} height='3' fill='#E6E6E6' strokeWidth='0' />
        <rect x={xValMarker} y='6' width='2' height='8' fill={needs[this.props.need].color} strokeWidth='0' /> :
      </svg>
    )
    
  }
}

class MunicipalityNeedItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scorePos: 0,
      selected: '',
      indicatorList: [],
      values: [],
      barangayIndicators: {}
    }
  }

  getScorePos (score) {
    if (score == "") {
      return ""
    }

    var needAverage = nationalAverages[needs[this.props.need]['prop-col']]
    var max = needAverage['max']
    var min = needAverage['min']
    var avg = needAverage['avg']
    var maxWidth = needAverage['max_width_from_mid']
    var chartMin = avg - maxWidth
    return (score - chartMin) / maxWidth * 50
  }

  componentDidMount () {
    var barangayIndicators = this.props.barangayIndicators
    var indicatorList = needs[this.props.need]['indicators']
    var needName = this.props.need
    var values = Object.keys(barangayIndicators).map(function (barangay) { return barangayIndicators[barangay][needs[needName]['prop-col']] })
    var scorePos = this.getScorePos(this.props.score)

    this.setState({
      scorePos: scorePos,
      indicatorList: indicatorList,
      values: values
    })
  }

  render () {
    var score = this.props.score
    var topIndicator = this.props.needExplanation
    var indicatorList = this.state.indicatorList
    var barangayIndicators = this.props.barangayIndicators
    var prunedIndicators = {}
    var indicatorAxisLabels = {}
    var explanationText = ''

    if (topIndicator && score) {
      var scoreRounded = null

      if (topIndicator['type'] === 'Proportion') {
        scoreRounded = Math.round(score / 10)
        scoreRounded = scoreRounded === 0 && score !== 0 ? 1 : scoreRounded === 10 && score !== 100 ? 9 : scoreRounded  
      } else {
        scoreRounded = Math.round(score)
        scoreRounded = scoreRounded === 0 && score !== 0 ? 1 : scoreRounded === 100 && score !== 100 ? 99 : scoreRounded
      }

      explanationText = topIndicator['type'] === 'Proportion' ? scoreRounded + ' out of 10 ' : scoreRounded + ' '
      explanationText += topIndicator['text']
    }

    for(var ind in indicatorList) {
      var indicator = indicatorList[ind]
      var tempData = []
      var tempValues = []

      for (var code in barangayIndicators) {
        var barangayName = barangayIndicators[code]['name']
        var barangayValue = barangayIndicators[code][indicator]

        if (barangayValue != null) {
          tempData.push({
            barangay: code,
            name: barangayName,
            value: barangayValue
          })
        }

        tempValues.push(barangayValue)
      }

      var max = Math.max.apply(Math, tempValues)
      var min = Math.min.apply(Math, tempValues)

      var axisLabels = {
        max: Math.ceil(max),
        min: Math.floor(min)
      }

      if (axisLabels.min === axisLabels.max) {
        tempData = []
      } 

      if (tempData.length > 0) {
        prunedIndicators[indicator] = tempData
        indicatorAxisLabels[indicator] = axisLabels
      }
    }

    var prunedIndicatorList = Object.keys(prunedIndicators)

    return (
      <li className={this.props.className}>
        <div className='mun-sidebar-header' onClick={this.props.clickMethod.bind(this)}>
          <NavLink activeClassName='active' to={'/map/' + this.props.need + '/municipality/' + this.props.munCode.substring(2)}>
            <h4>{needs[this.props.need].titles}</h4>
          </NavLink>
          <div className='mun-sidebar-header-chart'>
            {!(this.state.scorePos === null || isNaN(this.state.scorePos) || this.state.scorePos === '') &&
              <MunicipalityScoreChart need={this.props.need} scorePos={this.state.scorePos} score={this.props.score}/>}
          </div>
        </div>
        <div className='mun-sidebar-content'>
          <div className='mun-sidebar-main-desc'>
            { score === null || isNaN(score) || score === '' ? prunedIndicatorList.length === 0 ? 'No data is available for this municipality' : '' : explanationText }
          </div>
          {prunedIndicatorList.map((indicator, i) => (
            <MunicipalityStripPlot
              key={this.props.municipality + '-' + indicator}
              need={this.props.need}
              indicator={indicator}
              desc={this.props.indicatorDescriptions[indicator]}
              selected={this.state.selected}
              indicatorValues={prunedIndicators[indicator]}
              axisLabels={indicatorAxisLabels[indicator]} />
          ))}
        </div>
      </li>
    )
  }
}
export default styled(MunicipalityNeedItem)`
  margin: 0;
  padding: 0;

  div.mun-sidebar-header {
    border-bottom: 1px solid #DDD;
    padding: 0;
  }

  div.mun-sidebar-header h4 {
    position: relative;
    padding: 0 0 0 20px;
    margin: 0;
    display: inline-block;
    font-size: 1.1em;
    color: black;
    width: calc(100% - 90px);
  }

  div.mun-sidebar-header h4:hover,
  &.active div.mun-sidebar-header h4 {
    color: ${props => needs[props.need].color};
  }

  div.mun-sidebar-header h4:before {
    content: '\\002B';
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    color: gray;
  }

  div.mun-sidebar-header-chart {
    display: inline-block;
    width: 70px;
    position: relative;
    top: 5px;
  }

  div.mun-sidebar-content {
    max-height: 0;
    transition: 1s;
    margin: 0 0 0 20px;
    font-family: 'Proxima Nova';
    overflow: hidden;
  }

  &.active div.mun-sidebar-content {
    margin: 15px 0 30px 20px;
    max-height: 500px;
  }

  div.mun-sidebar-desc,
  div.mun-sidebar-chart-desc {
    font-size: 0.7em;
  }

  div.mun-sidebar-desc {
    color: #AAA;
    margin-top: 10px
  }

  div.mun-sidebar-chart-desc {
    font-weight: bold;
    width: 70%;
    margin-top: 20px;
  }

  div.mun-sidebar-chart{
    margin: 10px 0;
  }

  text.axis-label {
    font-size: 0.75em;
    font-weight: bold;
  }

  g.circleGroup text,
  g.circleGroup rect {
    display: none;
  }

  g.circleGroup:hover rect,
  g.circleGroup:hover text {
    display: inline-block;
  }

  g.circleGroup:hover rect {
    fill: #BBB;
  }

  g.circleGroup:hover text {
    fill: white;
    font-size: 0.7em;
    font-weight: bold;
  }

  text.axis-label{
    font-size: 0.75em;
    font-weight: bold;
  }
`
