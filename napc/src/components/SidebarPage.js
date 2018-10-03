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
      <div className={this.props.className}>
        <div className='overlay'>
          Basic Need:<br />
          <span className='need-text' style={{ color: needs[this.props.location.pathname]['color'] }} >{needs[this.props.location.pathname]['titles']}</span>
          <div className='need-body'>
            Explanation here
          </div>
          <div className='chart'>
            <OrdinalFrame
              size={[100, 50]}
              data={barChartData[this.props.location.pathname]}
              oAccessor={'municipality'}
              rAccessor={'score'}
              type={'bar'}
              oPadding={5}
              style={{ fill: needs[this.props.location.pathname]['color'] }}
            />
            <svg height={20}>
              <rect className='divider' style={{ height: '0.2vh', width: 100, fill: '#999999' }} />
            </svg>
          </div>
        </div>
        <div className='sidebar'>
          <div className='header-logo'>
            <img className='logo' src={require('../static/img/napc-logo.png')} />
          </div>
          <div className='body'>
            <div className='header'>
              Ito ang <br />Kuwento ng Bayan
            </div>
            <svg height={20}>
              <rect className='divider' />
            </svg>
            <div className='textbody'>
              A comprehensive, barangay-level map on data across the ten basic needs. Click on a category below to see how each province ranks on different needs.
            </div>
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
  @font-face{
    font-family: 'Akrobat'
    src: url('static/akrobat/Akrobat-Black.otf')
    font-style: black;
  }

  .sidebar {
    width: 40vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background:#f4f4f2;
    padding: 5vh;
    font-size: 2vh;
    font-family: 'Akrobat';
    color: #464646;
  }


  .need-icons{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding-right: 6vw;
    height: 1vh;
  }

  .divider{
    fill: #595959; 
    height: 0.5vw;
    width: 15vw;
    position: relative;

  .div-sider{
    height:10vh;
    padding: 1vh;
  }

  }
  .logo{
    width: 10vw;
  }
  .header{
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 3vw;
    padding-bottom: 1vw;
    color: #464646;
  }

  .logo-unselect{
    padding-right: 2vh;
    width: 5vw;
    display: inline;
  }

  .logo-select{
    padding-right: 2vh;
    width: 5vw;
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
    padding-bottom: 5vh;
  }


  h3 {
    font-family: 'Proxima Nova';
    font-weight: bold;
    margin-bottom: 0;
  }

  .overlay{
    font-family: 'Akrobat';
    font-weight: bold;
    font-size: 2vh;
    margin-bottom: 1vh;
    color: #464646;   
    padding: 1vw;
  }

  .need-text{
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 4vh;
    flex-wrap: wrap;
    padding-right: 90vw;
  }

  .need-body{
    font-size: 1.5vh;
    flex-wrap: wrap;
    padding-right: 80vw;
    color: #999999;
  }

  .chart{
    padding-top: 1vh;
    transition: ease-in 0.2s;
  }
`
