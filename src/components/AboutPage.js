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
                <p className='indicator ind-unselect'>{needs[need].titles}</p>
                <p className='indicator ind-select'>{needs[need].titles}</p>
                <div className='divider' />
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
    font-size:3vh;
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
    font-size:3vh;
    margin:0;
  }

  .need-holder{
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
    height: 75vh;
    padding-top:2vw;
    padding-left:3vw;
    width:45vh;
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
    right:15vh;
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

  @media all and (max-width: 700px) {
    .sidebar{
      z-index:-1;
    }

    .indicator{
      font-size:1.5vh;
    }

    .need-holder{
      width:30%;
      height:40vh;
    }
    .divider{
      margin-bottom:0; 
    }
    h3 {
      font-size:1.1vh;
    }
    .need-title{
      font-size:2vh;
      margin-top:3.5vw;
    }
    .need-logo{
      width:2.75vh;
      height:2.75vh;
      right:2vh;
      margin-top:2vw;
    }
    .def-holder{
      width:65vw;
    }
    .dict-divider{
      width:64vw;
    }
    .need-body{
      font-size:1.1vh;
      line-height:1.65vh;
      width:64vw;
    }
    .ind-holder{
      width:64vw;
    }
    .ind-title{
      font-size:1.5vh;
    }
    .ind-source{
      font-size:1.1vh;
    }
    .ind-body{
      font-size:1.1vh;
      line-height:1.65vh;
      padding-left:1vh;
      padding-right:1vh;
    }
  }
`
