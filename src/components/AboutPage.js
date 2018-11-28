import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { needs } from '../constants'

import styled from 'styled-components'
import * as d3 from 'd3'

class AboutPage extends Component {
  constructor () {
    super()
    this.state = {
      dict: null
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount () {
    d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vSQebIhEjhFR3LewIiByv3yfqc2YY0GH-cO5mXjhfYDfJY5Z7vVGvtsVSKN-CjtZhNxe0gOzHN0_bDN/pub?gid=534002250&single=true&output=csv').then(data => {
      this.setState({ dict: data })
      document.querySelector('#map').style.display = 'none'
    })
  }
  render () {
    return (
      <div className={this.props.className}>
        <div className='sidebar'>
          <h3>Data Dictionary</h3>
          <div className='need-holder'>
            {Object.keys(needs).map(need => (
              <NavLink activeClassName='active' to={'/about/' + need} key={need}>
                <div className='sidebar-desktop'>
                  <p className='indicator ind-unselect'>{needs[need].titles}</p>
                  <p className='indicator ind-select'>{needs[need].titles}</p>
                  <div className='divider' />
                </div>
                <div className='sidebar-mobile'>
                  <img class='sidebar-need-logo' src={need == this.props.match.params.need ? needs[need]['select-logo-path'] : needs[need]['unselect-logo-path']} />
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className='dict'>
          <div className='def-holder'>
            <p className='need need-title'>{needs[this.props.match.params.need].titles}</p>
            <img className='need-logo' src={needs[this.props.match.params.need]['unselect-logo-path']} />
            <div className='dict-divider' />
            <p className='need need-body'>{needs[this.props.match.params.need].explanation}</p>
            <div className='ind-holder'>
              {Object.keys(this.state.dict ? this.state.dict : '').filter(need => this.state.dict[need].Included === 'Yes').filter(need => this.state.dict[need].Need === needs[this.props.match.params.need].titles).map(need => (
                <div>
                  <p className='ind-title'>{this.state.dict[need].Indicator_Title}</p>
                  <p className='need ind-source'>From {this.state.dict[need].Source}</p>
                  <div className='need ind-body'>
                    <p className='ind-body-header'><b>Definition: </b>{this.state.dict[need].Indicator_Description}</p>
                    <p className='ind-body-header'><b>Methodology: </b>{this.state.dict[need].Definition}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default styled(AboutPage)`
  .sidebar{
    position:absolute;
    top:0;
    left:0;
    font-family: 'Akrobat';
    font-weight: bold;
    font-size: 2vh;
    background: #f4f4f2;
    display: inline-block;
    height:100%;
    width: 30%;
  }

  h3 {
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size:2vh;
    padding-left:3vw;
    padding-top:1.5vw;
    margin-bottom: 0;
  }

  .dict{
    position:absolute;
    width:70%;
    height:100%;
    background:#f7f7f5;
    right:0;
    top:0;
  }

  .indicator{
    font-size: 1.5em;
    margin:0;
    font-family: 'Akrobat';
  }

  .ind-unselect{
    color:#464646;
    display: inline-block;
  }

  .ind-select{
    color: ${props => needs[props.match.params.need].color};
    display: none;
  }

  .active .ind-unselect{
    color:#464646;
    display: none;
  }

  .active .ind-select{
    display: inline-block;
  }

  a{
    text-decoration:none;
    font-size: 1em;
    margin:0;
  }

  .need-holder{
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
    height: 75vh;
    padding:2vw 3vw;
  }

  .divider{
    border-bottom: 1px solid #b7b7b7;
    width: 23vw;
    margin-bottom:3vh; 
  }

  .def-holder{
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
    height:20%;
    width:60vw;
    padding-left:3vw;
  }

  .need{
    font-family:'Proxima Nova';
  }

  .need-title{
    font-size:4vh;
    color: ${props => needs[props.match.params.need].color};
    margin:0;
    margin-top:2.5vw;
  }

  .dict-divider{
    border-bottom: 1px solid #b7b7b7;
    width: 60vw;
    margin-bottom:0;
  }

  .need-logo{
    width:6vh;
    height:6vh;
    position:absolute;
    right: 3vh;
    margin-top:1.75vw;
  }

  .need-body{
    font-size:2vh;
    color:#464646;
    font-weight:0.5vh;
    padding:0;
    width:60vw;
    line-height:3.75vh;
  }

  .ind-title{
    font-family: 'Akrobat';
    letter-spacing:0.05vh;
    font-size:2.5vh;
    font-weight:lighter;
    color:#464646;
    margin-bottom:0;
    margin-top:0.5vh;
  }

  .ind-source{
    font-size:2vh;
    color:#464646;
    margin-top:0;
  }

  .ind-body-header{
    padding:0;
    margin:0;
  }

  .ind-body{
    font-size:2vh;
    line-height: 3.75vh;
    color:#464646;
    margin-top:0.5vw;
    margin-bottom:1.25vw;
    font-weight:1px;
    border-left: 1px solid #b7b7b7;
    padding-left:3vh;
  }

  div.sidebar-desktop {
    display: block;
  }

  div.sidebar-mobile {
    display: none;
  }

  @media all and (max-width: 768px) {
    .sidebar{
      z-index: 1;
      width: 16vw;
      height: 95vh;
      position: fixed;
      display: inline-block;
    }

    .indicator{
      font-size:1.5vh;
    }

    .need-holder{
      width: 10vw;
    }
    .divider{
      margin-bottom:0; 
    }
    h3 {
      font-size:1.1vh;
      display: none;
    }
    .need-title{
      font-size: 1.6em;
      margin-top:3.5vw;
    }

    .need-logo{
      display: none;
    }

    .dict{
      width: 84vw;
      position: relative;
      display: inline-block;
      left: 16vw;
      top: 0;
      min-height: 95vh;
      padding-bottom: 8vh;
    }

    .def-holder{
      width:80vw;
    }
    .dict-divider{
      width:80vw;
    }
    .need-body{
      font-size: 0.8em;
      line-height: 100%;
      width: auto;
      margin-bottom: 5px;
    }

    .ind-holder{
      width: auto;
    }

    .ind-title{
      font-size: 1em;
      margin-top: 20px;
    }
    .ind-source{
      font-size: 0.8em;
    }

    .ind-body{
      font-size: 0.8em;
      line-height: 150%;
      padding-left:1vh;
      padding-right:1vh;
    }

    div.sidebar-desktop {
      display: none;
    }

    div.sidebar-mobile {
      display: block;
    }

    img.sidebar-need-logo {
      width: 10vw;
      height: 10vw;
    }
  }
`
