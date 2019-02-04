import React, { Component } from 'react'
import styled from 'styled-components'
import { needs } from '../constants'
import * as d3 from 'd3'

class OverlayMunicipalityPage extends Component {
  constructor () {
    super()
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  titleCase (str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase())
      })
      .join(' ')
  }
  componentDidMount () {
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
              <div className='municipality-name'>
                {this.props.munData.Municipality}
              </div>
            </div>
            <div className='municipality-ranking-container'>
              <div className='mun-rank municipality-ranking'>
                {this.props.munRanks[this.props.need]}
              </div>
              <div className='mun-rank municipality-total'>
                Out of {this.props.munTotalCounts[this.props.need]}{' '}
                municipalities *
              </div>
            </div>
          </div>
          <div className='municipality-desc'>
            {this.props.munData.Description}
          </div>
          <div className='footnote'>
            * The number of municipalities shown is calculated based on the
            total number of municipalities with data available.
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
    font-family: 'Proxima Nova';
    font-weight: bold;
    box-sizing: border-box;
  }

  @media only screen and (min-width: 769px) {
    position: absolute;
    bottom: 5vh;
    right: 0;
    margin: 0;

    .municipality-information {
      bottom: 5vh;
      width: 70vw;
      height: 28vh;
      padding: 1.5vw;
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
    font-family: 'Akrobat';
  }

  .municipality-ranking-container {
    width: 120px;
    display: inline-block;
    text-align: right;
  }

  .municipality-ranking {
    font-size: 2.2em;
    font-family: 'Akrobat';
  }

  .municipality-total {
    font-size: 0.7em;
  }

  .municipality-desc {
    font-size: 0.9em;
    font-family: 'Proxima Nova Thin';
    margin-bottom: 0;
    margin-top: 2vh;
    text-align: justify;
  }

  .footnote {
    font-style: italic;
    font-size: 0.6em;
    font-family: 'Proxima Nova Thin';
    margin-bottom: 0;
    margin-top: 25px;
    text-align: justify;
  }
`
