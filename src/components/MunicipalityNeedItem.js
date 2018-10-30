import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { needs } from '../constants'

class MunicipalityStripPlot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      strip_data : []
    }
  }

  componentDidMount () {
    this.setState({
      strip_data: [
        { 'barangay': 'Barangay 1', 'value': 0.69 },
        { 'barangay': 'Barangay 2', 'value': 0.02 },
        { 'barangay': 'Barangay 3', 'value': 0.05 },
        { 'barangay': 'Barangay 4', 'value': 0.64 },
        { 'barangay': 'Barangay 5', 'value': 0.66 },
        { 'barangay': 'Barangay 6', 'value': 1 },
        { 'barangay': 'Barangay 7', 'value': 0.72 },
        { 'barangay': 'Barangay 8', 'value': 0.62 },
        { 'barangay': 'Barangay 9', 'value': 0.39 },
        { 'barangay': 'Barangay 10', 'value': 0.06 }
      ]
    })
  }

  render () {
    return (
      <div className='mun-sidebar-chart'>
        <svg width="100%" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" x2="90%" y1="calc(50% - 0.5)" y2="calc(50% - 0.5)" stroke="#CCC" stroke-width="1" />
          <line x1="10%" x2="10%" y1="5" y2="calc(100% - 5)" stroke="#CCC" stroke-width="1" />
          <line x1="90%" x2="90%" y1="5" y2="calc(100% - 5)" stroke="#CCC" stroke-width="1" />
          <line x1="calc(50% - 0.5)" x2="calc(50% - 0.5)" y1="5" y2="calc(100% - 5)" stroke="#CCC" stroke-width="1" />
          {this.state.strip_data.map((strip_data, i) => (
            <circle cx={ ((strip_data['value'] * 0.8 + 0.1) * 100) + "%" } cy="calc(50% - 0.5)" fill={needs[this.props.need].color} r="5" opacity="0.5"/>
          ))}
        </svg>
      </div>
      
    )
  }
}

class MunicipalityNeedItem extends Component {

  render () {
    var percentage = this.props.percentage;
    var x_val_line = percentage >= 0 ?  "50%" : (50 + percentage / 2) + "%";
    var x_val_marker_num = percentage >= 0 ? (percentage / 2 + 50) + "%" : (50 + percentage / 2) + "%";
    var x_val_marker = "calc(" + x_val_marker_num + " - 1.5px)";
    var line_width = (Math.abs(percentage) / 2) + "%" ;

    return (
      <li className={ this.props.className } >
        <div className='mun-sidebar-header' onClick={ this.props.click_method.bind(this) }>
          <h4>{needs[this.props.need].titles}</h4>
          <div className='mun-sidebar-header-chart'>
            <svg width="70" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <line x1="calc(50% - 0.5px)" x2="calc(50% - 0.5px)" y1="0" y2="100%" stroke="#CCC" stroke-width="1"/>
              <rect x={x_val_line} y="8.5" width={line_width} height="3" fill="#E6E6E6" stroke-width="0"/>
              <rect x={x_val_marker} y="6" width="2" height="8" fill={needs[this.props.need].color} stroke-width="0"/>
            </svg>
          </div>
        </div>
        <div className='mun-sidebar-content'>
          <div className='mun-sidebar-main-desc'>
            3 out of 10 0-5 year old children in Dumangas are <b>malnourished</b>
          </div>
          <div className='mun-sidebar-desc'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
          <div className='mun-sidebar-chart-desc'>
            Proportion of 0-5 year olds that are malnourished per barangay
          </div>
          <MunicipalityStripPlot need={this.props.need}/>
          <div className='mun-sidebar-chart-desc'>
            Proportion of farmers with insecure tenure
          </div>
          <MunicipalityStripPlot need={this.props.need}/>
        </div>
      </li>
    )
  }
}
export default styled(MunicipalityNeedItem)`
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
`
