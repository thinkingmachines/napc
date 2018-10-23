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

  componentDidUpdate (prevProps) {
    const need = this.props.match.params.need
    if (prevProps.match.params.need !== need) {
      console.log('Do something with need:', need)
      console.log(this.props.map)
    }
  }
  componentDidMount () {
    d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vRDAcbjK29YmfQp0gUew1yibgewts35cJtLeGyGc-Hj7kBi4yGdd-C7jbK61uG8pSzQHAt6rhO_qgqa/pub?output=csv').then(data => {
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
                <p className='ind-unselect'>{needs[need].titles}</p>
                <p className='ind-select'>{needs[need].titles}</p>
                <div className='divider' />
              </NavLink>
            ))}
          </div>
        </div>
        <div className='dict'>
          <div className='def-holder'>
            <p className='need-title'>{needs[this.props.match.params.need].titles}</p>
            <img className='need-logo' src={needs[this.props.match.params.need]['unselect-logo-path']} />
            <div className='dict-divider' />
            <p className='need-body'>{needs[this.props.match.params.need].explanation}</p>
            <div>
              {Object.keys(this.state.dict ? this.state.dict : '').filter(need => this.state.dict[need].Need === needs[this.props.match.params.need].titles).map(need => (
                <div>
                  <p className='ind-title'>{this.state.dict[need].Indicator}</p>
                  <p className='ind-source'>From {this.state.dict[need].Source}</p>
                  <p className='ind-body'>{this.state.dict[need].Definition}</p>
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

  .ind-unselect{
    font-size:3vh;
    margin:0;
    color:#464646;
    font-family: 'Akrobat';
    display: inline-block;
  }

  .ind-select{
    font-size:3vh;
    margin:0;
    font-family: 'Akrobat';
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
    height:5vh;
    width:60vw;
    padding-left:3vw;
  }

  .need-title{
    font-family:'Proxima Nova';
    font-size:5vh;
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
    width:7vh;
    position:absolute;
    height:7vh;
    right:15vh;
    margin-top:1.5vw;
  }

  .need-body{
    font-family: 'Proxima Nova';
    font-size:2.5vh;
    color:#464646;
    font-weight:0.5vh;
    padding:0;
    width:60vw;
    line-height:3.75vh;
  }

  .ind-title{
    font-family: 'Akrobat';
    letter-spacing:0.05vh;
    font-size:3vh;
    font-weight:lighter;
    color:#464646;
    margin-bottom:0;
    margin-top:1vw;
  }

  .ind-source{
    font-family: 'Proxima Nova';
    font-size:2.2vh;
    color:#464646;
    margin-top:0;
  }

  .ind-body{
    font-family: 'Proxima Nova';
    font-size:2.25vh;
    line-height: 3.75vh;
    color:#464646;
    margin-top:0.5vw;
    margin-bottom:2vw;
    font-weight:1px;
    border-left: 1px solid #b7b7b7;
    padding-left:3vh;
  }
`
