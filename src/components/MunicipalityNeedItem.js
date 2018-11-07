import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { needs } from '../constants'
import { indicatorDescriptions } from '../constants'
import municipalityIndicators from '../ind-mun.json';
import barangayGroups from '../ind-bgy-mungroup.json';
import barangayIndicators from '../ind-bgy.json';
import nationalAverages from '../ind-avg.json';

var tempMun = 'PH157001000'

class MunicipalityStripPlot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chartData : [],
      max : 0,
      min: 1,
      mid: 0.5
    }
  }

  componentDidMount () {
    var tempData = [];
    var barangayList = this.props.barangays;

    for (var i = 0; i < barangayList.length; i++) {
      var barangayCode = barangayList[i];

      tempData.push({
        barangay: barangayCode,
        value: barangayIndicators[barangayCode][this.props.indicator]
      });
    }

    var values = tempData.map(function(a) {return a.value;});
    var max = Math.max.apply(Math, values);
    var min = Math.min.apply(Math, values);
    var mid = (max + min)/2;

    this.setState({
      chartData: tempData,
      max: Math.round(max * 100)/100,
      min: Math.round(min * 100)/100,
      mid: Math.round(mid * 100)/100
    });
  }

  calculateDataPosition (value) {
    if (value) {
      return (value - this.state.min)/(this.state.max - this.state.min);
    }
    return -1;
  }

  render () {
    return (
      <div>
        <div className='mun-sidebar-chart-desc'>
          {this.props.desc}
        </div>
        <div className='mun-sidebar-chart'>
          <svg width="100%" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" x2="90%" y1="calc(50% - 5.5)" y2="calc(50% - 5.5)" stroke="#CCC" stroke-width="1" />
            <line x1="10%" x2="10%" y1="5" y2="calc(100% - 15)" stroke="#CCC" stroke-width="1" />
            <line x1="90%" x2="90%" y1="5" y2="calc(100% - 15)" stroke="#CCC" stroke-width="1" />
            <line x1="calc(50% - 0.5)" x2="calc(50% - 0.5)" y1="5" y2="calc(100% - 15)" stroke="#CCC" stroke-width="1" />
            {this.state.chartData.map((chartData, i) => (
              <circle
                data-barangay={chartData['barangay']}
                onMouseOver={this.props.hoverMethod.bind(this)}
                onMouseOut={this.props.hoverOutMethod.bind(this)}
                cx={((this.calculateDataPosition(chartData['value']) * 0.8 + 0.1) * 100) + "%"}
                cy="calc(50% - 5.5)" fill={needs[this.props.need].color}
                r="5"
                opacity={this.props.selected == null || this.props.selected == chartData['barangay'] ? 0.6 : 0.2}/>
            ))}
            <text class="axis-label" x="10%" y="calc(100% - 4px)" text-anchor="middle">{this.state.min}</text>
            <text class="axis-label" x="50%" y="calc(100% - 4px)" text-anchor="middle">{this.state.mid}</text>
            <text class="axis-label" x="90%" y="calc(100% - 4px)" text-anchor="middle">{this.state.max}</text>
          </svg>
        </div>
      </div>
    )
  }
}

class MunicipalityScoreChart extends Component {
  render () {
    var scorePos = this.props.scorePos;
    var xValLine = scorePos >= 50 ?  "50%" : scorePos + "%"
    var xValMarkerNum = scorePos + "%";
    var xValMarker = "calc(" + xValMarkerNum + " - 1.5px)";
    var lineWidth = Math.abs(scorePos - 50) + "%" ;

    return (
        <svg width="70" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <line x1="calc(50% - 0.5px)" x2="calc(50% - 0.5px)" y1="0" y2="100%" stroke="#CCC" stroke-width="1"/>
          <rect x={xValLine} y="8.5" width={lineWidth} height="3" fill="#E6E6E6" stroke-width="0"/>
          <rect x={xValMarker} y="6" width="2" height="8" fill={needs[this.props.need].color} stroke-width="0"/>
        </svg>
    )
  }
}

class MunicipalityNeedItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scorePos: 0,
      selected: null,
      indicatorList : [],
      barangayList: [],
      values: []
    }
  }

  getScorePos (values, score) {
    var max = Math.max.apply(Math, values); // 100
    var min = Math.min.apply(Math, values); // 20
    var avg = nationalAverages[needs[this.props.need]['prop-col']]; // 0
    var maxWidth = Math.max(max - avg, avg - min); // 100
    var chartMin = avg - maxWidth; // -100
    return (score - chartMin) / maxWidth * 50; // 130 / 100 * 50  
  }

  componentDidMount () {
    var indicatorList = needs[this.props.need]['indicators'];
    var barangayList = barangayGroups[tempMun];
    var needName = this.props.need;
    var values = barangayList.map(function(barangay) { return barangayIndicators[barangay][needs[needName]['prop-col']]; });
    var scorePos = this.getScorePos(values, this.props.score);

    this.setState({
      scorePos: scorePos,
      indicatorList: indicatorList,
      barangayList: barangayList,
      values: values
    });
  }

  setBarangayScore (e) {
    var barangay = e.target.dataset.barangay;
    var scorePos = this.getScorePos(this.state.values, barangayIndicators[barangay][needs[this.props.need]['prop-col']]);

    this.setState({
      scorePos: scorePos,
      selected: barangay
    });
  }

  setMunicipalityScore () {
    var scorePos = this.getScorePos(this.state.values, this.props.score);

    this.setState({
      scorePos: scorePos,
      selected: null
    });
  }

  render () {
    return (
      <li className={ this.props.className }>
        <div className='mun-sidebar-header' onClick={this.props.clickMethod.bind(this)}>
          <NavLink activeClassName='active' to={'/map/' + this.props.need + '/municipality'}>
            <h4>{needs[this.props.need].titles}</h4>
          </NavLink> 
          <div className='mun-sidebar-header-chart'>
            <MunicipalityScoreChart need={this.props.need} scorePos={this.state.scorePos}/>
          </div>
        </div>
        <div className='mun-sidebar-content'>
          <div className='mun-sidebar-main-desc'>
            3 out of 10 0-5 year old children in Dumangas are <b>malnourished</b>
          </div>
          {this.state.indicatorList.map((indicator, i) => (
            <MunicipalityStripPlot
              need={this.props.need}
              indicator={indicator}
              desc={indicatorDescriptions[indicator]}
              barangays={this.state.barangayList}
              hoverMethod={(e) => this.setBarangayScore(e)}
              hoverOutMethod={() => this.setMunicipalityScore()}
              selected={this.state.selected} />
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
    margin-top: 10px;
  }

  text.axis-label{
    font-size: 0.75em;
    font-weight: bold;
  }
`
