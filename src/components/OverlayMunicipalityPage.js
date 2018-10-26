import React, { Component } from 'react'
import styled from 'styled-components'
import { needs } from '../constants'

class OverlayMunicipalityPage extends Component {
  constructor () {
    super()
    this.state = {
      provData: {}
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  titleCase (str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase())
    }).join(' ')
  }
  componentDidMount () {
    this.props.map.on('click', 'municities', (e) => {
      const { id, layer, properties } = Array(e.features[0])[0]
      this.setState({
        provData: {
          id: id,
          layer: layer.maxzoom,
          provName: this.titleCase(properties.Mun_Name)
        }
      })
    })
  }
  render () {
    return (
      <div className={this.props.className}>
        <div className='municipality-information'>
          <div className='municipality-holder'>
            <p className='municipality-header'>Ito ang Kwento ng</p>
            <p className='mun-rank municipality-ranking'>85</p>
            <p className='municipality-name'>
              {this.state.provData.provName}
            </p>
            <p className='mun-rank municipality-total'>Out of 1600</p>
          </div>
          <p className='municipality-desc'>Lorem ipsum</p>
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
  display: absolute;
  .municipality-information{
    width:66vw;
    height:20vh;
    background: white;
    padding:2vw;
  }
  .municipality-holder{
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
  }
  .municipality-header {
    font-family: 'Proxima Nova';
    width:50%;
    font-size: 2vh;
    font-weight:bold;
    margin:0;
  }
  .municipality-name {
    font-family: 'Akrobat';
    font-weight: lighter;
    font-size: 7.5vh;
    flex-wrap: wrap;
    margin:0;
    margin-top:-7vh;
    width:50%;
    color: ${props => needs[props.need].color};
  }
  .mun-rank{
    width:50%;
    text-align:right;
    margin:0;
  }
  .municipality-ranking{
    font-family: 'Akrobat';
    width:50%;
    font-size: 8vh;
    font-weight:bold;
    margin-top:-1vh;
  }
  .municipality-total{
    font-size:2vh;
    font-family:'Proxima Nova';
    margin-top:-1vh;
  }
  .municipality-desc{
    font-family: 'Proxima Nova';
    font-size:2vh;
    font-weight: lighter;
    margin-bottom: 0;
    margin-top:1vh;
    line-height:3vh;
    text-align:justify;
  }
`
