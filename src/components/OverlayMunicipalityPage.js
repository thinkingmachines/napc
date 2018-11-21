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
    d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vSQebIhEjhFR3LewIiByv3yfqc2YY0GH-cO5mXjhfYDfJY5Z7vVGvtsVSKN-CjtZhNxe0gOzHN0_bDN/pub?gid=660297486&single=true&output=csv').then(ranks => {
      this.setState({ munRanks: ranks })
    })
    const munCode = this.props.munCode
  }
  render () {
    const need = this.props.need
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
              {Object.keys(this.state.munRanks ? this.state.munRanks : '').filter(need =>  this.props.munCode === this.state.munRanks[need].Mun_Code).map(need => (
                <div className='mun-rank municipality-ranking'>
                  {this.state.munRanks[need][this.props.need]}
                </div>
              ))}
              {Object.keys(this.state.munRanks ? this.state.munRanks : '').filter(need =>  this.state.munRanks[need].Mun_Code === 'Total').map(need => (
                <div className='mun-rank municipality-total'>
                  Out of {this.state.munRanks[need][this.props.need]} municipalities *
                </div>
              ))}
            </div>
          </div>
          {Object.keys(this.state.munData ? this.state.munData : '').filter(need =>  this.props.munCode === this.state.munData[need].MunCode).map(need => (
            <div className='municipality-desc'>
              {this.state.munData[need].Description}
            </div>
          ))}
          <div className='footnote'>
            * The number of municipalities shown is calculated based on the total number of municipalities with data available.
          </div>
        </div>
      </div>
    )
  }
}
export default styled(OverlayMunicipalityPage)`
  position: relative;

  .municipality-information {
    width: 100%;
    height: auto;
    background: white;
    padding: 20px;
    font-family:'Proxima Nova';
    font-weight: bold;
    box-sizing: border-box;
  }

  @media only screen and (min-width: 700px) {
    position: absolute;
    bottom: 5vh;
    left: 0;
    margin: 0;
    
    .municipality-information {
      bottom: 5vh;
      width: 70vw;
      height: 25vh;
      padding: 2vw;
    }
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
    font-size: 0.9em;
    font-family:'Proxima Nova Thin';
    margin-bottom: 0;
    margin-top: 2vh;
    text-align: justify;
  }

  .footnote{
    font-style:italic;
    font-size: 0.8em;
    font-family:'Proxima Nova Thin';
    margin-bottom: 0;
    margin-top: 40px;
    text-align: justify;
  }

`
