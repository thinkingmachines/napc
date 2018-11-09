import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { needs, indicatorDescriptions } from '../constants'
import nationalAverages from '../ind-avg.json'

class MunicipalityStripPlot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chartData: [],
      max: 0,
      min: 1,
      mid: 0.5
    }
  }

  componentDidMount () {
    var tempData = []
    var values = []
    var barangayIndicators = this.props.barangayIndicators
    var indicator = this.props.indicator

    for (var code in barangayIndicators) {
      var barangayName = barangayIndicators[code]['name']
      var barangayValue = barangayIndicators[code][indicator]

      tempData.push({
        barangay: code,
        name: barangayName,
        value: barangayValue
      })

      values.push(barangayValue)
    }

    var max = Math.max.apply(Math, values)
    var min = Math.min.apply(Math, values)
    var mid = (max + min) / 2

    this.setState({
      chartData: tempData,
      max: Math.round(max * 100) / 100,
      min: Math.round(min * 100) / 100,
      mid: Math.round(mid * 100) / 100
    })
  }

  calculateDataPosition (value) {
    if (value) {
      return (value - this.state.min) / (this.state.max - this.state.min)
    }
    return -1
  }

  render () {
    return (
      <div>
        <div className='mun-sidebar-chart-desc'>
          {this.props.desc}
        </div>
        <div className='mun-sidebar-chart'>
          <svg width='100%' height='45' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <line x1='10%' x2='90%' y1='calc(50% + 8.5)' y2='calc(50% + 8.5)' stroke='#CCC' strokeWidth='1' />
            <line x1='10%' x2='10%' y1='25' y2='calc(100% - 7)' stroke='#CCC' strokeWidth='1' />
            <line x1='90%' x2='90%' y1='25' y2='calc(100% - 7)' stroke='#CCC' strokeWidth='1' />
            <line x1='calc(50% - 0.5)' x2='calc(50% - 0.5)' y1='25' y2='calc(100% - 7)' stroke='#CCC' strokeWidth='1' />
            {this.state.chartData.map((chartData, i) => (
              <g
                className='circleGroup'
                key={i}>
                <circle
                  data-barangay={chartData['barangay']}
                  onMouseOver={this.props.hoverMethod.bind(this)}
                  onMouseOut={this.props.hoverOutMethod.bind(this)}
                  cx={((this.calculateDataPosition(chartData['value']) * 0.8 + 0.1) * 100) + '%'}
                  cy='calc(50% + 8.5px)'
                  fill={needs[this.props.need].color}
                  r='5'
                  opacity={this.props.selected === '' || this.props.selected === chartData['barangay'] ? 0.6 : 0.2} />
                <rect
                  x='calc(50% - 50px)'
                  y='0'
                  width='100px'
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
            <text className='axis-label' x='10%' y='45' textAnchor='middle' alignmentBaseline='baseline'>{this.state.min + ''}</text>
            <text className='axis-label' x='50%' y='45' textAnchor='middle' alignmentBaseline='baseline'>{this.state.mid + ''}</text>
            <text className='axis-label' x='90%' y='45' textAnchor='middle' alignmentBaseline='baseline'>{this.state.max + ''}</text>
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
    var xValMarker = scorePos >= 50 ? scorePos == 50 ? 'calc(' + xValMarkerNum + ' - 1px)' : 'calc(' + xValMarkerNum + ' - 2px)' : xValMarkerNum
    var lineWidth = Math.abs(scorePos - 50) + '%'

    return (
      <svg width='70' height='20' version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <line x1='calc(50% - 0.5px)' x2='calc(50% - 0.5px)' y1='0' y2='100%' stroke='#CCC' strokeWidth='1' />
        <rect x={xValLine} y='8.5' width={lineWidth} height='3' fill='#E6E6E6' strokeWidth='0' />
        <rect x={xValMarker} y='6' width='2' height='8' fill={needs[this.props.need].color} strokeWidth='0' />
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

  getScorePos (values, score) {
    var max = Math.max.apply(Math, values)
    var min = Math.min.apply(Math, values)
    var avg = nationalAverages[needs[this.props.need]['prop-col']]
    var maxWidth = Math.max(max - avg, avg - min)
    var chartMin = avg - maxWidth
    return (score - chartMin) / maxWidth * 50
  }

  componentDidMount () {
    var barangayIndicators = this.props.barangayIndicators
    var indicatorList = needs[this.props.need]['indicators']
    var needName = this.props.need
    var values = Object.keys(barangayIndicators).map(function (barangay) { return barangayIndicators[barangay][needs[needName]['prop-col']] })
    var scorePos = this.getScorePos(values, this.props.score)

    this.setState({
      scorePos: scorePos,
      indicatorList: indicatorList,
      values: values
    })
  }

  setBarangayScore (e) {
    var barangay = e.target.dataset.barangay
    var scorePos = this.getScorePos(this.state.values, this.props.barangayIndicators[barangay][needs[this.props.need]['prop-col']])

    this.setState({
      scorePos: scorePos,
      selected: barangay
    })
  }

  setMunicipalityScore () {
    var scorePos = this.getScorePos(this.state.values, this.props.score)

    this.setState({
      scorePos: scorePos,
      selected: ''
    })
  }

  render () {
    return (
      <li className={this.props.className}>
        <div className='mun-sidebar-header' onClick={this.props.clickMethod.bind(this)}>
          <NavLink activeClassName='active' to={'/map/' + this.props.need + '/municipality'}>
            <h4>{needs[this.props.need].titles}</h4>
          </NavLink>
          <div className='mun-sidebar-header-chart'>
            <MunicipalityScoreChart need={this.props.need} scorePos={this.state.scorePos} />
          </div>
        </div>
        <div className='mun-sidebar-content'>
          <div className='mun-sidebar-main-desc'>
            3 out of 10 0-5 year old children in Dumangas are <b>malnourished</b>
          </div>
          {this.state.indicatorList.map((indicator, i) => (
            <MunicipalityStripPlot
              key={this.props.municipality + '-' + indicator}
              need={this.props.need}
              indicator={indicator}
              desc={indicatorDescriptions[indicator]}
              hoverMethod={(e) => this.setBarangayScore(e)}
              hoverOutMethod={() => this.setMunicipalityScore()}
              selected={this.state.selected}
              barangayIndicators={this.props.barangayIndicators} />
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
    fill: #CCC;
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
