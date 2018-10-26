import React, { Component } from 'react'
import styled from 'styled-components'

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
  font-size: 2vh;
  font-family: 'Akrobat';
  color: #464646;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  h3 {
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size:2vh;
    margin: 0;
  }
`
