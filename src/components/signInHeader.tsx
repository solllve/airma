import React, { Component } from 'react'
import {connect,useSelector, useDispatch} from 'react-redux'
import '../ui.css'
import LoadingLogo from './loadingLogo'
class SignInHeader extends Component {

  render() {

    return (
      <div className="signInHeader">
        <LoadingLogo />
      </div>
    )
  }
}
export default SignInHeader
