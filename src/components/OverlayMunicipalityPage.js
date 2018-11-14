import React, { Component } from 'react'
import styled from 'styled-components'
import { needs } from '../constants'
import * as d3 from 'd3'

class OverlayMunicipalityPage extends Component {
  constructor () {
    super()
    this.state = {
      munData: null,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  titleCase (str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase())
    }).join(' ')
  }
  componentDidMount () {
    d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vSQebIhEjhFR3LewIiByv3yfqc2YY0GH-cO5mXjhfYDfJY5Z7vVGvtsVSKN-CjtZhNxe0gOzHN0_bDN/pub?gid=0&single=true&output=csv').then(data => {
      this.setState({ munData: data })
    })
    const munCode = this.props.munCode
  }
  render () {
    return (
      <div className={this.props.className}>
        <div className='municipality-information'>
          <div className='municipality-holder'>
            <div className='municipality-name-container'>
              <div className='municipality-header'>Ito ang Kwento ng</div>
              {Object.keys(this.state.munData ? this.state.munData : '').filter(need =>  this.props.munCode === this.state.munData[need].MunCode).map(need => (
                <div className='municipality-name'>
                  {this.state.munData[need].Municipality}
                </div>
              ))}
            </div>
            <div className='municipality-ranking-container'>
              <div className='mun-rank municipality-ranking'>85</div>
              <div className='mun-rank municipality-total'>Out of 1600</div>
            </div>
          </div>
          <div className='municipality-desc'>Dumangas is a municipality located in the region of Western Visayas in the Philippines. Iloilo occupies a major southeast portion of the Visayan island of Panay</div>
        </div>
      </div>
    )
  }
}
export default styled(OverlayMunicipalityPage)`
  position:absolute;
  bottom:5vh;
  left:0;
  margin:0;
   .municipality-information {
    width:66vw;
    height:20vh;
    background: white;
    padding:2vw;
    font-family:'Proxima Nova';
    font-weight: bold;
  }
   .municipality-name-container {
    width: calc(100% - 120px);
    display: inline-block;
  }
   .municipality-header {
    font-size: 0.7em;
  }
   .municipality-name {
    font-size: 1.7em;
    color: ${props => needs[props.need].color};
    font-family:'Akrobat';
  }
   .municipality-ranking-container {
    width: 120px;
    display: inline-block;
    text-align: right;
  }
   .municipality-ranking {
    font-size: 2.2em;
    font-family:'Akrobat';
  }
   .municipality-total {
    font-size: 0.7em
  }
   .municipality-desc{
    font-size: 0.8em;
    font-family:'Proxima Nova Thin';
    margin-bottom: 0;
    margin-top: 2vh;
    text-align: justify;
  }
`
