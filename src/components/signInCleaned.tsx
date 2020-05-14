import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from "react-hook-form"
import {connect,useSelector, useDispatch} from 'react-redux'

import {
  getAirtableApi,
  getAirtableBaseId,
  getAirtableTableName,
  getAirtableTableConnection,
  getAirtableData
} from "../store/actions"
import store from '../store'
import AirmaLogo from '../assets/airma-logo.svg'
import SignInHeader from "./SignInHeader";
import '../ui.css'


class SignInModal extends Component {

  connectToAirtableApi() {
  //  parent.postMessage({
  //      pluginMessage:
  //      {
  //        type: 'airtable',
  //        message: store.getState().airtableData[0],
  //        tableName: this.state.tableName
  //      }
  //  }, '*')
  }

  apiKeyValue(event) {
    store.dispatch(getAirtableApi(event.target.value))
  }

  baseIdValue(event) {
    store.dispatch(getAirtableBaseId(event.target.value))
  }

  tableNameValue(event) {
    store.dispatch(getAirtableTableName(event.target.value))
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  apiIsValid() {
    if(store.getState().airApi != '') {
      return true
    }
  }

  baseIdIsValid() {
    if(store.getState().baseId != '') {
      return true
    }
  }

  tableNameIsValid() {
    if(store.getState().tableName != '') {
      return true
    }
  }

  apiFieldValidator() {
    if(store.getState().airApi == '') {
      return '🤦'
    }
    else {
      return '👍'
    }
  }

  baseIdFieldValidator() {
    if(store.getState().baseId == '') {
      return '🤦'
    }
    else {
      return '👍'
    }
  }

  tableNameFieldValidator() {
    if(store.getState().tableName == '') {
      return '🤦'
    }
    else {
      return '👍'
    }
  }

  buttonCondition() {


  }

  closePluginWindow() {
    parent.postMessage({ pluginMessage: { type: 'close-plugin' } }, '*')
  }

  async getState() {
    console.log(store.getState())
  }

  render() {
    return (
      <div className="airtable__container">
        <SignInHeader />
        <div className="form__inner">
          <form onSubmit={this.handleSubmit}>
            <div className="input__field-container">
              <span className="--error-validation">{this.apiFieldValidator()}</span>
              <input className={"input__field --password__field" + (this.apiIsValid() ? '' : ' --invalid')} type="password" onChange={this.apiKeyValue} placeholder="API Key"  />
            </div>
            <div className="input__field-container">
              <span className="--error-validation">{this.baseIdFieldValidator()}</span>
              <input className={"input__field" + (this.baseIdIsValid() ? '' : ' --invalid')} type="text" onChange={this.baseIdValue} placeholder="Base ID"  />
            </div>
            <div className="input__field-container">
              <span className="--error-validation">{this.tableNameFieldValidator()}</span>
              <input className={"input__field" + (this.tableNameIsValid() ? '' : ' --invalid')} type="text" onChange={this.tableNameValue} placeholder="Table Name"  />
            </div>

          </form>
        </div>
      </div>
    )
  }
}
export default SignInModal
