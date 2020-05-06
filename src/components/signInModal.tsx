import React, { Component } from 'react'
import {connect,useSelector, useDispatch} from 'react-redux'
import {
  getAirtableApi,
  getAirtableBaseId,
  getAirtableTableName,
  getAirtableData
} from "../store/actions"
import store from '../store'
import AirmaLogo from '../assets/airma-logo.svg'
import SignInHeader from "./SignInHeader";
import '../ui.css'

class SignInModal extends Component {

  render() {

    return (
      <div className="airtable__container">
        <SignInHeader />
      </div>
    )
  }
}
export default SignInModal
