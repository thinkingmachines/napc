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
          provName: 'Dumangas' // this.titleCase(properties.Mun_Name)
        }
      })
    })
  }
  render () {
    return (
      <div className={this.props.className}>
        <div className='municipality-information'>
          <div className='municipality-holder'>
            <div className='municipality-name-container'>
              <div className='municipality-header'>Ito ang Kwento ng</div>
              <div className='municipality-name'>
                Dumangas {this.state.provData.provName}
              </div>
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

  // .municipality-holder{
  //   display: flex;
  //   justify-content: flex-start;
  //   flex-flow: row wrap;
  // }
  // .municipality-header {
  //   font-family: 'Proxima Nova';
  //   width:50%;
  //   font-size: 2vh;
  //   font-weight:bold;
  //   margin:0;
  // }
  // .municipality-name {
  //   font-family: 'Akrobat';
  //   font-weight: lighter;
  //   font-size: 7.5vh;
  //   flex-wrap: wrap;
  //   margin:0;
  //   margin-top:-7vh;
  //   width:50%;
  //   color: ${props => needs[props.need].color};
  // }
  // .mun-rank{
  //   width:50%;
  //   text-align:right;
  //   margin:0;
  // }
  // .municipality-ranking{
  //   font-family: 'Akrobat';
  //   width:50%;
  //   font-size: 8vh;
  //   font-weight:bold;
  //   margin-top:-1vh;
  // }
  // .municipality-total{
  //   font-size:2vh;
  //   font-family:'Proxima Nova';
  //   margin-top:-1vh;
  // }
  // .municipality-desc{
  //   font-family: 'Proxima Nova';
  //   font-size:2vh;
  //   font-weight: lighter;
  //   margin-bottom: 0;
  //   margin-top:1vh;
  //   line-height:3vh;
  //   text-align:justify;
  // }
`
