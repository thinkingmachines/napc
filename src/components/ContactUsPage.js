import React, { Component } from 'react'

import styled from 'styled-components'
import * as d3 from 'd3'

class ContactUsPage extends Component {
  constructor () {
    super()
    this.state = {
      contactInfo: {}
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount () {
    d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vSQebIhEjhFR3LewIiByv3yfqc2YY0GH-cO5mXjhfYDfJY5Z7vVGvtsVSKN-CjtZhNxe0gOzHN0_bDN/pub?gid=400830878&single=true&output=csv').then(data => {
      const [ desc, trunklines, fax, email, location, facebook, privacyNotice ] = data
      this.setState({
        contactInfo: {
          desc: desc.Content,
          trunklines: trunklines.Content,
          fax: fax.Content,
          email: email.Content,
          location: location.Content,
          facebook: facebook,
          privacyNotice: privacyNotice.Content
        }
      })
    })
  }
  render () {
    return (
      <div className={this.props.className}>
        <div className='sidebar'>
          <div className='contact-holder'>
            <img className='logo' src='/static/img/napc-logo.png' />
            <h3 className='body-text'>Contact Us</h3>
            <p className='contact-text contact-desc'>{this.state.contactInfo.desc}</p>
          </div>
          <br />
          <div className='info-holder'>
            <p className='contact-text'><b className='contact-headers'>Trunklines: </b>{this.state.contactInfo.trunklines}</p>
            <p className='contact-text'><b className='contact-headers'>Fax: </b>{this.state.contactInfo.fax}</p>
            <p className='contact-text'><b className='contact-headers'>Email: </b>{this.state.contactInfo.email}</p>
          </div>
          <img className='map' src='/static/img/location.png' />
          <p className='contact-text contact-location'>{this.state.contactInfo.location}</p>
          <br />
          <p className='contact-text sns-header'><b className='contact-headers'>Social Media</b></p>
          <br />
          <div className='sns-holder'>
            <a href='https://www.facebook.com/NAPC.PH/' target='_blank'><img className='socialmedia-buttons' src={'/static/img/fb-unselect.png'} /></a>
            <a href='https://twitter.com/napc_ph?lang=en' target='_blank'><img className='socialmedia-buttons' src={'/static/img/twitter-unselect.png'} /></a>
            <a href='https://twitter.com/napc_ph?lang=en' target='_blank'><img className='socialmedia-buttons' src={'/static/img/google-unselect.png'} /></a>
          </div>
        </div>
        <div className='form'>
          <p className='body-text form-header'>ACTION CENTER CONTACT FORM</p>
          <div className='divider' />
          <br />
          <div className='form-holder'>
            <input type='text' className='body-text inputs form-inputs' placeholder='First Name' name='fname' />
            <input type='text' className='body-text inputs form-inputs' placeholder='Last Name' name='lname' />
            <input type='text' className='body-text inputs form-inputs' placeholder='Phone Number' name='phonenum' />
            <input type='text' className='body-text inputs form-inputs' placeholder='Email' name='email' />
            <select className='body-text inputs select-inputs' placeholder='Purpose'>
              <option value='' disabled selected>Purpose</option>
              <option>Option1</option>
              <option>Option2</option>
            </select>
            <textarea type='text' className='body-text inputs form-msg' placeholder='Write your request here' name='msg' />
            <br />
            <a className='body-text send-button' href=''><img className='send-button-img' src={'/static/img/send.png'} /> Send</a>
            <p className='body-text privacy-text'>Privacy Notice: {this.state.contactInfo.privacyNotice}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default styled(ContactUsPage)`

  .body-text{
    color:#464646;
  }

  .sidebar{
    position:absolute;
    left:0;
    font-family: 'Akrobat';
    font-weight: bold;
    font-size: 2vh;
    background: #f4f4f2;
    display: inline-block;
    height:100%;
    width: 30%;
  } 

  .logo{
    width: 7vw;
    padding-left:3vw;
    padding-top:1.5vw;
  }

  h3 {
    font-family: 'Akrobat';
    font-weight: bold;
    font-size:4.5vh;
    padding-left:3vw;
    margin-bottom: 0;
  }

  .form{
    position:absolute;
    width:70%;
    height:100%
    background:#f7f7f5;
    right:0;
    top:0;
  }

  .sns-holder{
    display:flex;
    margin-left:3vw !important;
    padding-top:1vh;
    padding-bottom:1vh;
    padding-left:2vw;
    border-left: 1px solid #b7b7b7;
  }

  .socialmedia-buttons{
    width:2vw;
    padding-right:0.5vw;
  }

  .contact-text{
    font-family: 'Proxima Nova';
    font-size:2vh;
    font-weight: lighter;
    padding: 0vw 4vw 0 2vw;
    margin-bottom: 0;
    margin-top:0.5vh;
    color:#464646;
    text-align:justify;
  }

  .contact-desc{
    padding-left:3vw;
  }

  .contact-headers{
    font-weight:bolder;
  }

  .info-holder{
    margin-left:3vw;
    padding-top:1vh;
    padding-bottom:1vh;
    border-left: 1px solid #b7b7b7;
  }

  .map{
    float:right;
    margin-top:-1vw;
    width:10vw;  
    z-index:-1;
  }

  .contact-location{
    margin-left:12vw;
    margin-top:6.5vw; 
    font-family: 'Proxima Nova';
    font-size:2vh;
    font-weight:lighter;
    z-index:1;
    padding-bottom:1vw;
  }

  .form-header{
    font-family: 'Akrobat';
    letter-spacing:0.15vh;
    font-weight: bold;
    font-size:3.5vh;
    padding-left:3vw;
    padding-top:1.5vw;
    margin:0;
  }

  .divider{
    border-bottom: 1px solid #b7b7b7;
    width: 46vh;
    margin-left:3vw;
    margin-top:0;
  }

  .form-holder{
    padding-left:2vw;
    padding-right:5vw;
  }

  *:focus{
    outline: none !important;
  }

  .inputs{
    padding-top:2vw;
    font-family: 'Proxima Nova';
    font-weight: lighter;
    font-size:2.5vh;
    background:#f7f7f5;
    border:0px;
    border-bottom: 1px solid #b7b7b7;
    margin-left:1vw;
    padding-bottom:0.5vw;
  }

  .form-inputs{
    width:48%;
  }

  .select-inputs{
    width:98%;
  }

  .form-msg{
    font-family: 'Proxima Nova';
    font-weight: lighter;
    font-size:2.5vh;
    background:#f7f7f5;
    border: 1px solid #b7b7b7;
    width:91%;
    height:25vh;
    margin-top:2vw;
    margin-left:1vw;
    padding: 2vw;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #f7f7f5 inset;
  }

  .send-button{
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size:3vh;
    text-decoration: none;
    margin-left: 56vw;
  }

  .send-button-img{
    width:1.5vw;
    margin-top:1vw;
    padding-right:0.5vw;
  }

  .send-button:hover{
    color:red;
  }

  .privacy-text{
    opacity:0.8;
    font-family: 'Proxima Nova';
    font-weight:lighter;
    font-size:2vh;
    margin-left:1vw;
    margin-top:1.5vw;
    line-height:3vh;
  }

  .sns-header{
    padding-left:3vw;
    margin-top:-7vh;
  }

  @media all and (max-width: 700px) {
    .sidebar{
      position: absolute;
      bottom: 0;
      width: 100%;
      height:30%
    }
    .contact-holder{
      display: flex;
      justify-content: flex-start;
      flex-flow: row wrap;
      padding-top:2vw;
    }
    .logo{
      width:8vw;
      height:8vw;
      padding-top:2.5vw;
    }
    .inputs{
      font-size:1.5vh;
    }

    h3{
      font-size:2vh;
      height:2vh;
      margin-top:1vh;
      padding-left:3vw;
    }
    .form{
      padding-top:2vw;
      z-index:-1;
      width:100%;
      height:70%;
    }
    .form-header{
      font-size:2vh;
      padding-top:1.5vh;
      padding-left:5vw;
    }
    .form-holder{
      padding-left:4vw;
    }
    .form-msg{
      width:92.5%;
    }
    .divider{
      width: 28vh;
      margin-left:5vw;
    }
    .send-button{
      margin-left:80vw;
      font-size:1.5vh;
    }
    .privacy-text{
      text-align:justify;
      font-size:1.25vh;
      line-height:1.875vh;
    }
    .contact-text{
      font-size:1.25vh;
    }
    .contact-desc{
      width:80%;
      margin-left:6vh;
      margin-top:-2.5vh;
    }
    .contact-headers{
      font-weight:bolder;
      font-size:1.6vh;
      padding-top:2vh;
    }
    .contact-location{
      margin-left:70vw;
      width:10vw;
      font-size:1.1vh;
      margin-top:-2.5vh;
    }
    .sns-header{
      margin-top:-8vw;
    }
    .sns-holder{
      margin-top:-3vw;
      padding-bottom:0;
      padding-top:0;
    }
    .map{
      width:18vw;
      margin-top:-18vw;
      margin-bottom:2vw;
    }
    .socialmedia-buttons{
      width:4vw;
    }
    .info-holder{
      padding-top:0;
      padding-bottom:0;
    }
  }
`
