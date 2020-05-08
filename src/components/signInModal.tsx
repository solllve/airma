import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from "react-hook-form"
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

type MyProps = {};
type MyState = {
  airtableApi: string,
  baseId: string,
  tableName: string,
};

class SignInModal extends Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      airtableApi: '',
      baseId: '',
      tableName: '',
    };
    this.airtableApiChange = this.airtableApiChange.bind(this);
    this.baseIdChange = this.baseIdChange.bind(this);
    this.tableNameChange = this.tableNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async connectToAirtableApi() {
    let promise = new Promise((resolve, reject) => {
      let apiKeyLocal = this.state.airtableApi
      let baseIdLocal = 'appsN1xTPJYU0WIZC'
      let tableNameLocal = 'Personas'
      var options = {
        'method': 'GET',
        'url': 'https://api.airtable.com/v0/'+ baseIdLocal +'/'+ tableNameLocal +'?api_key='+ apiKeyLocal,
      };
      fetch(options.url, {
        mode: 'cors',
        method: "GET",
        credentials: "same-origin"
      }).then(function(response) {

        if (response.status == 200) {
          resolve(true)
          store.dispatch(getAirtableData(response))
        }

        //return response.text()
      }, function(error) {
        error.message //=> String
      })

    })
    let result = await promise
    console.log(result)
  }

  airtableApiChange(event) {
    this.setState(
      {
        airtableApi: event.target.value
      }
    );

  }

  baseIdChange(event) {
    this.setState(
      {
        baseId: event.target.value
      }
    );
  }
  tableNameChange(event) {
    this.setState(
      {
        tableName: event.target.value
      }
    );
  }

  handleSubmit(event) {
    alert(this.state.airtableApi);
    event.preventDefault();
  }

  apiIsValid() {
    if(this.state.airtableApi != '') {
      return true
    }
  }

  fieldValidator() {
    return '&#128077;'
  }

  render() {
    this.connectToAirtableApi()

    return (
      <div className="airtable__container">
        <SignInHeader />
        <div className="form__inner">
          <form onSubmit={this.handleSubmit}>
            <div className="input__field-container">
              <span className="--error-validation">{this.fieldValidator()}</span>
              <input className={"input__field --password__field" + (this.apiIsValid() ? '' : ' --invalid')} type="password" value={this.state.airtableApi} onChange={this.airtableApiChange} placeholder="API Key"  />
            </div>
            <div className="input__field-container">
              <input className="input__field" type="text" value={this.state.baseId} onChange={this.baseIdChange} placeholder="Base ID"  />
            </div>
            <div className="input__field-container">
              <input className="input__field" type="text" value={this.state.tableName} onChange={this.tableNameChange} placeholder="Table Name"  />
            </div>
            <input className="input__submit" type="submit" value="Submit"  />
          </form>
        </div>
      </div>
    )
  }
}
export default SignInModal
