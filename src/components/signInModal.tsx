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
  constructor(props: MyProps) {
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
      let baseIdLocal = this.state.baseId
      let tableNameLocal = this.state.tableName
      var options = {
        'method': 'GET',
        'url': 'https://api.airtable.com/v0/'+ baseIdLocal +'/'+ tableNameLocal +'?api_key='+ apiKeyLocal,
      };
      if(apiKeyLocal != '' && baseIdLocal != '' && tableNameLocal != '' ) {
        fetch(options.url, {
          mode: 'cors',
          method: options.method,
          credentials: "same-origin"
        }).then(function(response) {

          if (response.status == 200) {
            resolve(response.text())
            console.log('successful connection to api')
          }
        }, function(error) {
          //error.message
          console.log('You still require some verification, Bub.')
        })
      }

    })
    let result = await promise
    store.dispatch(getAirtableData(result))
    parent.postMessage({ pluginMessage: { type: 'airtable', message: store.getState().airtableData[0] } }, '*')
  }

  airtableApiChange(event) {
    store.dispatch(getAirtableApi(event.target.value))
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
    event.preventDefault();
  }

  apiIsValid() {
    if(this.state.airtableApi != '') {
      return true
    }
  }

  baseIdIsValid() {
    if(this.state.baseId != '') {
      return true
    }
  }

  tableNameIsValid() {
    if(this.state.tableName != '') {
      return true
    }
  }

  apiFieldValidator() {
    if(this.state.airtableApi == '') {
      return '🤦'
    }
    else {
      return '👍'
    }
  }

  baseIdFieldValidator() {
    if(this.state.baseId == '') {
      return '🤦'
    }
    else {
      return '👍'
    }
  }

  tableNameFieldValidator() {
    if(this.state.tableName == '') {
      return '🤦'
    }
    else {
      return '👍'
    }
  }

  closePluginWindow() {
    parent.postMessage({ pluginMessage: { type: 'close-plugin' } }, '*')
  }

  render() {
    this.connectToAirtableApi()
    return (
      <div className="airtable__container">
        <SignInHeader />
        <div className="form__inner">
          <form onSubmit={this.handleSubmit}>
            <div className="input__field-container">
              <span className="--error-validation">{this.apiFieldValidator()}</span>
              <input className={"input__field --password__field" + (this.apiIsValid() ? '' : ' --invalid')} type="password" value={this.state.airtableApi} onChange={this.airtableApiChange} placeholder="API Key"  />
            </div>
            <div className="input__field-container">
              <span className="--error-validation">{this.baseIdFieldValidator()}</span>
              <input className={"input__field" + (this.baseIdIsValid() ? '' : ' --invalid')} type="text" value={this.state.baseId} onChange={this.baseIdChange} placeholder="Base ID"  />
            </div>
            <div className="input__field-container">
              <span className="--error-validation">{this.tableNameFieldValidator()}</span>
              <input className={"input__field" + (this.tableNameIsValid() ? '' : ' --invalid')} type="text" value={this.state.tableName} onChange={this.tableNameChange} placeholder="Table Name"  />
            </div>
            {console.log('test')}
            <input onClick={this.closePluginWindow} className={"input__submit" + (this.tableNameIsValid() ? '' : ' --invalid')} type="submit" value="Connect to Airtable"  />
          </form>
        </div>
      </div>
    )
  }
}
export default SignInModal
