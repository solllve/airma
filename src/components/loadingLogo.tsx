import React, { Component } from 'react'
import {connect,useSelector, useDispatch} from 'react-redux'
import '../ui.css'

import Logo1 from '../assets/airtable-animated1.svg'
import Logo2 from '../assets/airtable-animated2.svg'
import Logo3 from '../assets/airtable-animated3.svg'
import LogoText from '../assets/airma-text.svg'

class LoadingLogo extends Component {

  render() {

    return (
      <div>
        <div className="loadingLogo">
          <img src={Logo1} className="logo--1" id="moveLogo1"/>
          <img src={Logo2} className="logo--2" id="moveLogo2" />
          <img src={Logo3} className="logo--3" id="moveLogo3" />
        </div>
        <div>
          <img src={LogoText} />
        </div>
      </div>
    )
  }
}
export default LoadingLogo
