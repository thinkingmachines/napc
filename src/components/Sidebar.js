import React, { Component } from 'react'
import styled from 'styled-components'

class Sidebar extends Component {
  render () {
    return <div class={this.props.className}>{this.props.children}</div>
  }
}

export default styled(Sidebar)`
  box-sizing: border-box;
  position:absolute;
  background:#f4f4f2;
  top:0;
  right:0;
  height :97vh;
  width:30vw;
  padding: 2.5vw;
  font-size: 2vh;
  font-family: 'Akrobat';
  color: #464646;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .description{
    display: flex;
    flex-direction: column;
  }

  .logo{
    width: 7vw;
    margin: 1vh;
  }

  .header {
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 3vw;
    width: 26vw;
    padding-top: 2vh;
    padding-bottom: 1vh;
    margin-left: 0;
    color: #464646;
    line-height:99%;
  }

  .divider{
    border-bottom: 5px solid #595959;
    width: 23vh;
  }

  .textbody{
    margin-right: 15vh;
    padding-bottom: 1vh;
    padding-top: 2vh;
    position  : relative;
  }

  .need-icon-header{
    padding-top:3vh;
  }

  h3 {
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size:2.5vh;
    margin-bottom: 0;
  }

  .category{
    margin-right: 15vh;
    padding-bottom: 1vh;
    top: -1vh;
    position  : relative;
  }

  .need-icons{
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
    padding-top:1vw;
    padding-right: 3vw;
    height: 20vh;
    width:45vh;
  }

  .need-icons a {
    height: 5vh;
    padding-bottom: 1vh;
  }

  .logo-unselect{
    padding-right: 2vh;
    padding-bottom: 5vh;
    width: 7vh;
    height: 7vh;
    display: inline-block;
  }

  .logo-select{
    padding-right: 2vh;
    padding-bottom: 5vh;
    width: 7vh;
    height: 7vh;
    display: none;
  }

  .sidebar .active .logo-unselect{
    display: none;
  }

  .sidebar .active .logo-select{
    display: inline;
  }


  @media all and (max-width: 700px) {
    /*display: flex;
    flex-direction: column;
    align-items: stretch;
    */width: 100vw;

    h3{
      visibility:hidden;
    }

    .category{
      visibility:hidden;
    }
    .sidebar {
      position: relative;
      bottom: 0;
      right:0;
      left:0;
      width: 100%;
      height:100%;
    }
    .overlay{
      width: 100vw;
      /*height: 67vh; */
    }
    .description{
      flex-direction: row;
      align-items: center;
      padding:2vh;
    }

    .description .divider {
      border-left: 1px solid #595959;
      transform: rotate(90deg);
      width: 9vh;
    }

    .description svg {
      width: 0.5vw;
      height: 5vh;
      flex-grow: 1;
      margin: 1vw;
    }
    .description .header{
      display: inline-block;
      line-height:90%;
      font-size: 4vw;
      width: 26vw;
      padding:0;
      margin-left:0.8vh;
    }

    .textbody{
      font-size: 2.5vw;
      width: 60vw;
      margin-right:5vh;
      padding-top:1vh;
    }

    .description .logo{
      font-size: 3vw;
      width :8vh;
      flex-grow: 1;
      display: inline-block;
    }

    .logo-unselect{
      padding-right: 1vh;
      padding-bottom: 5vh;
      width: 6vh;
      height: 6vh;
      display: inline-block;
    }

    .logo-select{
      padding-right: 1vh;
      padding-bottom: 5vh;
      width: 6vh;
      height: 6vh;
      display: none;
    }

    .need-icons{

      display: flex;
      justify-content: space-around;
      flex-flow: row wrap;
      padding-top:1vw;
      padding-right: 1vw;
      height: 20vh;
      width:40vh;
      margin-top:-10vh;
      margin-left:7vh;
    }
  }
`
