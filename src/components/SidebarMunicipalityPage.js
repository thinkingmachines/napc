import React, { Component } from 'react'
import styled from 'styled-components'

class SidebarMunicipalityPage extends Component {
  render () {
    return <div className={this.props.className}>{this.props.children}</div>
  }
}

export default styled(SidebarMunicipalityPage)`
  background: #f4f4f2;
  box-sizing: border-box;
  padding: 20px 20px calc(5vh + 20px);
  width: 100%;
  height: auto;
  font-family: 'Akrobat';
  color: #464646;
  position: relative;

  @media only screen and (min-width: 769px) {
    position: absolute;
    top: 0;
    left: 0;
    height: 98vh;
    width: 30vw;
    padding: 2.5vw;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
  }

  h3 {
    font-family: 'Proxima Nova Semibold';
    font-weight: bold;
    font-size: 0.7em;
    margin: 0;
  }

  div.mun-sidebar-label-div {
    text-align: right;
  }
  
  div.mun-sidebar-label {
    font-family: 'Proxima Nova';
    font-size: 0.6em;
    text-align: center;
    width: 70px;
    display: inline-block;
  }
  
  ul.mun-sidebar-list {
    list-style: none;
    padding: 0;
    margin: 5px 0;
  }
`
