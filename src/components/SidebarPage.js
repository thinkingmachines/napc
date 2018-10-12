import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { OrdinalFrame } from 'semiotic'
import { needs } from '../constants'

const barChartData = { '/food': [
  { municipality: '6', score: 0.5 },
  { municipality: '4', score: 0.8 },
  { municipality: '3', score: 0.2 },
  { municipality: '1', score: 0.9 }
],
'/water': [
  { municipality: '6', score: 0.5 },
  { municipality: '4', score: 0.6 },
  { municipality: '3', score: 0.3 },
  { municipality: '1', score: 0.1 }
],
'/shelter': [
  { municipality: '6', score: 0.8 },
  { municipality: '4', score: 0.2 },
  { municipality: '3', score: 0.4 },
  { municipality: '1', score: 0.6 }
],
'/work': [
  { municipality: '6', score: 0.1 },
  { municipality: '4', score: 0.9 },
  { municipality: '3', score: 0.6 },
  { municipality: '1', score: 0.2 }
],
'/health': [
  { municipality: '6', score: 0.1 },
  { municipality: '4', score: 0.4 },
  { municipality: '3', score: 0.6 },
  { municipality: '1', score: 0.2 }
],
'/education': [
  { municipality: '6', score: 0.1 },
  { municipality: '4', score: 0.4 },
  { municipality: '3', score: 0.3 },
  { municipality: '1', score: 0.2 }
],
'/protect': [
  { municipality: '6', score: 0.1 },
  { municipality: '4', score: 0.7 },
  { municipality: '3', score: 0.1 },
  { municipality: '1', score: 0.8 }
],
'/environment': [
  { municipality: '6', score: 0.9 },
  { municipality: '4', score: 0.1 },
  { municipality: '3', score: 0.5 },
  { municipality: '1', score: 0.9 }
],
'/peace': [
  { municipality: '6', score: 0.5 },
  { municipality: '4', score: 0.8 },
  { municipality: '3', score: 0.2 },
  { municipality: '1', score: 0.9 }
],
'/participation': [
  { municipality: '6', score: 0.5 },
  { municipality: '4', score: 0.8 },
  { municipality: '3', score: 0.2 },
  { municipality: '1', score: 0.9 }
] }

class SidebarPage extends Component {
  componentDidUpdate (prevProps) {
    const { need } = this.props.match.params
    if (prevProps.match.params.need !== need) {
      console.log('Do something with need: ', need)
    }
  }
  render () {
    return (
      <div id='mainPage' className={this.props.className}>
        <div className='overlay'>
          Basic Need:<br />
          <div className='need-text' style={{ color: needs[this.props.location.pathname]['color'] }} >
            {needs[this.props.location.pathname]['titles']}
            <br />
            <span className='need-body'>{ needs[this.props.location.pathname]['explanation'] }</span>
          </div>
          <div className='horiz-dotted' />
          <div className='chart'>
            <OrdinalFrame
              size={[150, 50]}
              data={barChartData[this.props.location.pathname]}
              oAccessor={'municipality'}
              rAccessor={'score'}
              type={'bar'}
              oPadding={5}
              style={{ fill: needs[this.props.location.pathname]['color'] }}
              baseMarkProps={{ forceUpdate: true }}
            />
            <svg height={20}>
              <rect className='divider' style={{ height: '0.2vh', width: 150, fill: '#999999' }} />
            </svg>
          </div>
        </div>
        <div className='sidebar'>
          <div className='description'>
            <img className='logo' src={'/static/img/napc-logo.png'} />
            <div className='header'> Ito ang <br />Kuwento ng Bayan </div>
            <svg height={20}>
              <rect className='divider' />
            </svg>
            <div className='textbody'>
              A comprehensive, barangay-level map on data across the ten basic needs. Click on a category below to see how each province ranks on different needs.
            </div>
          </div>
          <div className='need-icon-header'>
            <h3>
              Basic Needs
            </h3>
            <div className='textbody'>
              Select a category below:
            </div>
          </div>
          <div className='need-icons'>

            {Object.keys(needs).map(path => (
              <NavLink activeClassName='active' to={path} key={path}>
                <img className='logo-select' src={needs[path]['select-logo-path']} />
                <img className='logo-unselect' src={needs[path]['unselect-logo-path']} />
              </NavLink>
            ))}

          </div>
        </div>
      </div>
    )
  }
}

export default styled(SidebarPage)`
  display: flex;
  flex-direction: row;
  align-items: stretch;


  @font-face{
    font-family: 'Akrobat'
    src: url('static/akrobat/Akrobat-Black.otf')
    font-style: black;
  }

  .sidebar {
    top: 0;
    right: 0;
    background:#f4f4f2;
    height: 90.5vh;
    width: 40vw;
    padding: 3vw;
    font-size: 2vh;
    font-family: 'Akrobat';
    color: #464646;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .overlay{
    font-family: 'Akrobat';
    font-weight: bold;
    height: 90.5vh;
    font-size: 2vh;
    margin-bottom: 1vh;
    color: #464646;
    padding: 1vw;
    display: inline-block;
    flex-grow: 20;
  }

  .description{
    display: flex;
    flex-direction: column;
  }
  @media all and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100vw;

    .sidebar {
      padding: 5vw;
      width: 86vw;
      height: 25vh;
    }
    .overlay{
      width: 100vw;
      height: 66.5vh;
    }
    .description{
      flex-direction: row;
      align-items: center;
    }

    .description .divider {
      width: 0.5vw;
      height: 10vh;
    }

    .description svg {
      width: 0.5vw;
      height: 5vh;
      flex-grow: 1
      margin: 1vw;
    }
    .description .header{
      display: inline-block;
      flex-grow: 3
      font-size: 4vw;
      width: 10vw;
      padding:0;
    }

    .description .textbody{
      font-size: 2.5vw;
      flex-grow: 5;
      padding:0;
      width: 30vw;
      display: inline-block;
    }

    .description .logo{
      font-size: 3vw;
      flex-grow: 1
      display: inline-block;
    }

    .need-icons{
      padding-right: 0;
    }

  }

  .need-icons{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding-right: 6vw;
    height: 20vh;
    align-content: flex-start;
  }

  .divider{
    fill: #595959;
    height: 0.5vw;
    width: 15vw;

  }
  .logo{
    width: 10vw;
    margin: 1vh;
  }

  .header {
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 3vw;
    width: 30vw;
    padding-bottom: 1vh;
    margin-left: 0;
    color: #464646;
  }

  .need-icons a {
    height: 5vh;
    padding-bottom: 1vh;
  }

  .logo-unselect{
    padding-right: 2vh;
    width: 5vh;
    height: 5vh;
    display: inline;
  }

  .logo-select{
    padding-right: 2vh;
    width: 5vh;
    height: 5vh;
    display: none;
  }

  .sidebar .active .logo-unselect{
    display: none;
  }

  .sidebar .active .logo-select{
    display: inline;
  }

  .textbody{
    padding-right: 15vh;
    padding-bottom: 1vh;
  }


  h3 {
    font-family: 'Proxima Nova';
    font-weight: bold;
    margin-bottom: 0;
  }

  .need-text{
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 4vh;
    flex-wrap: wrap;
    padding-right: 10vw;
    height: 15vh;
  }

  .need-body{
    font-family: 'Akrobat';
    font-size: 1.5vh;
    flex-wrap: wrap;
    padding-right: 0;
    color: #999999;
  }

  .chart{
    padding-top: 5vh;
    position: absolute;
  }

  .horiz-dotted {
    border-bottom: 2px dashed #999999;
    width: 15vh;
  }
`
