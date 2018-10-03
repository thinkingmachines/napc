import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { OrdinalFrame } from 'semiotic'

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

const colors = { '/food': '#86c440',
  '/water': '#438cca',
  '/shelter': '#f5bb18',
  '/work': '#a03054',
  '/health': '#e74b36',
  '/education': '#177c9f',
  '/protect': '#f7903d',
  '/environment': '#d4d639',
  '/peace': '#10b9cd',
  '/participation': '#a09288' }

const titles = { '/food': 'Food and Land Reform',
  '/water': 'Water and Sanitation',
  '/shelter': 'Shelter',
  '/work': 'Work',
  '/health': 'Health',
  '/education': 'Education',
  '/protect': 'Social Protection',
  '/environment': 'Healthy Environment',
  '/peace': 'Peace',
  '/participation': 'Participation' }

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
          <span className='need-text' style={{ color: colors[this.props.location.pathname] }} >{titles[this.props.location.pathname]}</span>
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
              style={{ fill: colors[this.props.location.pathname] }}
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

            <NavLink activeClassName='active' to='/food'>
              <img className='logo-select' src={require('../static/img/01-food-select.png')} />
              <img className='logo-unselect' src={require('../static/img/01-food-unselect.png')} />
            </NavLink>

            <NavLink activeClassName='active' to='/water'>
              <img className='logo-select' src={require('../static/img/06-water-select.png')} />
              <img className='logo-unselect' src={require('../static/img/06-water-unselect.png')} />
            </NavLink>

            <NavLink activeClassName='active' to='/shelter'>
              <img className='logo-select' src={require('../static/img/02-shelter-select.png')} />
              <img className='logo-unselect' src={require('../static/img/02-shelter-unselect.png')} />
            </NavLink>

            <NavLink activeClassName='active' to='/work'>
              <img className='logo-select' src={require('../static/img/07-work-select.png')} />
              <img className='logo-unselect' src={require('../static/img/07-work-unselect.png')} />
            </NavLink>

            <NavLink activeClassName='active' to='/health'>
              <img className='logo-select' src={require('../static/img/03-health-select.png')} />
              <img className='logo-unselect' src={require('../static/img/03-health-unselect.png')} />
            </NavLink>

            <NavLink activeClassName='active' to='/education'>
              <img className='logo-select' src={require('../static/img/08-education-select.png')} />
              <img className='logo-unselect' src={require('../static/img/08-education-unselect.png')} />
            </NavLink>

            <NavLink activeClassName='active' to='/protect'>
              <img className='logo-select' src={require('../static/img/04-protect-select.png')} />
              <img className='logo-unselect' src={require('../static/img/04-protect-unselect.png')} />
            </NavLink>

            <NavLink activeClassName='active' to='/environment'>
              <img className='logo-select' src={require('../static/img/09-environment-select.png')} />
              <img className='logo-unselect' src={require('../static/img/09-environment-unselect.png')} />
            </NavLink>

            <NavLink activeClassName='active' to='/peace'>
              <img className='logo-select' src={require('../static/img/05-peace-select.png')} />
              <img className='logo-unselect' src={require('../static/img/05-peace-unselect.png')} />
            </NavLink>

            <NavLink activeClassName='active' to='/participation'>
              <img className='logo-select' src={require('../static/img/10-participation-select.png')} />
              <img className='logo-unselect' src={require('../static/img/10-participation-unselect.png')} />
            </NavLink>

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
