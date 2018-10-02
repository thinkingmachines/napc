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
          Basic Need: {this.props.match.params.need}
        </div>
        <div className='sidebar'>
          <NavLink activeClassName='active' to='/water'>Water</NavLink>
          <NavLink activeClassName='active' to='/fire'>Fire</NavLink>
          <NavLink activeClassName='active' to='/wind'>Wind</NavLink>
          <NavLink activeClassName='active' to='/earth'>Earth</NavLink>
          <NavLink activeClassName='active' to='/love'>Love</NavLink>
        </div>
      </div>
    )
  }
}

export default styled(SidebarPage)`
  .sidebar {
    width: 50vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
  }
  .sidebar .active {
    background: pink;
  }
`
