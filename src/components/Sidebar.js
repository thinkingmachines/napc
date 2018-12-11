import React, { Component } from 'react'
import styled from 'styled-components'

class Sidebar extends Component {
  render () {
    return <div className={this.props.className}>{this.props.children}</div>
  }
}

export default styled(Sidebar)`
  box-sizing: border-box;
  position:absolute;
  background:#f4f4f2;
  left: 0;
  height: 97.25vh;
  width:30vw;
  padding: 2.5vw;
  font-size: 2vh;
  font-family: 'Akrobat';
  color: #464646;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  display: inline-block;
  position: relative;

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
    line-height:3.6vw;
  }

  .divider{
    border-bottom: 5px solid #595959;
    width: 23vh;
  }

  .textbody{
    font-family: 'Proxima Nova';
    margin-right: 2vh;
    font-weight: 2vh;
    line-height: 3vh;
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
    height: 18vh;
    width:43vh;
  }

  .need-icons a {
    height: 5vh;
    padding-bottom: 1vh;
  }

  .logo-unselect{
    padding-right: 1.25vh;
    width: 7.25vh;
    height: 7.25vh;
    display: inline-block;
  }

  .logo-select{
    padding-right: 1.25vh;
    width: 7.25vh;
    height: 7.25vh;
    display: none;
  }

  .active .logo-unselect{
    display: none;
  }

  .active .logo-select{
    display: inline;
  }

  footer{
    position:absolute !important;
    bottom:0;
    width:100%;
    background:#525251;
  }
  
  .footer-content-holder{
    height:5vh;
    display:flex;
    width:50vh;
    padding-left:90vh;
  }  

  .footer-text{
    font-family:'Proxima Nova';
    color: white;
    text-align:center;
    padding-right: 2vh;
    font-size:1.5vh;
  }
  
  .redirect-buttons{
    text-decoration:none;
  }

  @media all and (max-width: 768px) {
    position: relative;
    width: 100%;
    min-height: 45vh;
    height: auto;

    h3{
      visibility:hidden;
    }

    .category{
      visibility:hidden;
    }

    .description{
      flex-direction: row;
      align-items: center;
      padding:1vh;
      padding-top:2.5vh;
    }

    .description .divider {
      border-left: 0.5px solid #595959;
      transform: rotate(90deg);
      width: 12vh;
    }

    .description .header{
      display: inline-block;
      line-height:90%;
      font-size: 3.75vw;
      width: 28vw;
      padding:0 0 0 0.25vh;
    }

    .textbody{
      font-size: 2.5vw;
      line-height:3.75vw;
      width: 80vw;
      padding-top:1vh;
      text-align:justify;
    }

    .description .logo{
      width :7.25vh;
      flex-grow: 1;
      display: inline-block;
    }

    .logo-unselect{
      width: 6vh;
      height: 6vh;
    }

    .logo-select{
      width: 6vh;
      height: 6vh;
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
      margin-left:7.25vh;
    }
  }
`
