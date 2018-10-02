import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

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
          Basic Need: {this.props.location.pathname}
        </div>
        <div className='sidebar'>
          <div className='header-logo'>
            <img className='logo' src={require('../static/img/napc-logo.png')} />
          </div>
          <div className='need-icons'>
            <NavLink activeClassName='active' to='/food'>
              <img className='need-logo' src={require('../static/img/01-food-unselect.png')} />
            </NavLink>
            <NavLink activeClassName='active' to='/fire'>Fire</NavLink>
            <NavLink activeClassName='active' to='/wind'>Wind</NavLink>
            <NavLink activeClassName='active' to='/earth'>Earth</NavLink>
            <NavLink activeClassName='active' to='/love'>Love</NavLink>
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
  .logo{
    width: 10vw;
  }
  .need-logo{
    width: 5vw;
  }
  .sidebar {
    width: 40vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background:#f4f4f2;
    padding: 3vh;
    font-size: 10vh;
    font-family: 'Akrobat';
    font-weight: 'black';

  }
  .sidebar .active {
    background: pink;
  }
  .div-sider{
    height:10vh;
    padding: 1vh;
  }
  .need-icons{
    display: flex;
    flex-direction: column;
    padding: 3vh; 
  }
`
