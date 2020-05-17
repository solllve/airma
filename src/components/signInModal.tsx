import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from "react-hook-form"
import {connect,useSelector, useDispatch} from 'react-redux'

import {
  getAirtableApi,
  getAirtableBaseId,
  getAirtableTableName,
  getAirtableData,
  getAirtableTableConnection
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
  isLoaded: boolean
};

class SignInModal extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      airtableApi: '',
      baseId: '',
      tableName: '',
      isLoaded: false,
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
            //alert(tableNameLocal + ' table data loaded successfully!')
            parent.postMessage({ pluginMessage: { type: 'successful-message' } }, '*')
          }
          else {
            parent.postMessage({ pluginMessage: { type: 'fail-message' } }, '*')
          }
        }, function(error) {
          //error.message
          console.log('You still require some verification, Bub.')
        })
      }

    })
    let result = await promise
    //store.dispatch(getAirtableData(result))
    parent.postMessage({ pluginMessage: { type: 'airtable', message: result, tableName: this.state.tableName  } }, '*')
  }

  airtableApiChange(event) {
    this.validateAllFields()
    store.dispatch(getAirtableApi(event.target.value))
    this.setState(
      {
        airtableApi: event.target.value
      }
    );

  }

  baseIdChange(event) {
    this.validateAllFields()
    this.setState(
      {
        baseId: event.target.value
      }
    );
  }
  tableNameChange(event) {
    this.validateAllFields()
    this.setState(
      {
        tableName: event.target.value
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
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

  validateAllFields() {
    if(this.state.tableName != '' && this.state.baseId != '' && this.state.airtableApi != '') {
      console.log(this.state.isLoaded)
      this.setState(
        {
          isLoaded: true
        }
      );
    }
    else {
      console.log(this.state.isLoaded)
      this.setState(
        {
          isLoaded: false
        }
      );
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
              <input className={"input__field --password__field"} type="password" value={this.state.airtableApi} onChange={this.airtableApiChange} placeholder="API Key"  />
            </div>
            <div className="input__field-container">
              <span className="--error-validation">{this.baseIdFieldValidator()}</span>
              <input className={"input__field"} type="text" value={this.state.baseId} onChange={this.baseIdChange} placeholder="Base ID"  />
            </div>
            <div className="input__field-container">
              <span className="--error-validation">{this.tableNameFieldValidator()}</span>
              <input className={"input__field"} type="text" value={this.state.tableName} onChange={this.tableNameChange} placeholder="Table Name"  />
            </div>

          </form>
        </div>
      </div>
    )
  }
}
export default SignInModal
