import React, { Component } from 'react'
import styled from 'styled-components'
import { needs } from '../constants'

class SidebarMunicipalityPage extends Component {
  render () {
    return <div className={this.props.className}>{this.props.children}</div>
  }
}

export default styled(SidebarMunicipalityPage)`
  box-sizing: border-box;
  position:absolute;
  background:#f4f4f2;
  top:0;
  right:0;
  height :98vh;
  width:30vw;
  padding: 2.5vw;
  font-family: 'Akrobat';
  color: #464646;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  h3 {
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 0.7em;
    margin: 0;
  }

  div.mun-sidebar-label {
    font-family: 'Proxima Nova';
    font-size: 0.6em;
    text-align: right;
    width: 50px;
    position: absolute;
    top: 35px;
    right: 8vh;
  }

  ul.mun-sidebar-list {
    list-style: none;
    padding: 0;
  }

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
  li.mun-sidebar-item.active h4 {
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

  li.mun-sidebar-item.active div.mun-sidebar-content {
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
