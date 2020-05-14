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

class SubmitButton extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      airtableApi: '',
      baseId: '',
      tableName: '',
      isLoaded: false,
    };
  }
  componentDidMount() {
    fetch('https://api.airtable.com/v0/'+ store.getState().baseId +'/'+ store.getState().tableName +'?api_key=' + store.getState().airApi)
      .then(res => res)
      .then(
        (result) => {
          console.log(result.status)
          if (result.status == 200) {
              this.setState({
               isLoaded: true
             });
           }
        },

        (error) => {
          console.log(error)
          this.setState({
           isLoaded: false
         });
        }
      )
  }
  closePluginWindow() {
    parent.postMessage({ pluginMessage: { type: 'close-plugin' } }, '*')
  }
  render() {
    const {isLoaded } = this.state;
    console.log(isLoaded)
    if(isLoaded == true) {
      return (
        <input onClick={this.closePluginWindow} className={"input__submit"} type="submit" value="Connect to Airtable"  />
      )
    }
    else if(isLoaded == false) {
      return (
        <input className={"input__submit --invalid"} type="submit" value="Connect to Airtable"  />
      )
    }
  }

}

class SignInModal extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      airtableApi: store.getState().airApi,
      baseId: store.getState().baseId,
      tableName: store.getState().tableName,
      isLoaded: false,
    };
  }

  async connectToAirtableApi() {
    let promise = new Promise((resolve, reject) => {
      let apiKeyLocal = store.getState().airApi
      let baseIdLocal = store.getState().baseId
      let tableNameLocal = store.getState().tableName
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
    parent.postMessage({ pluginMessage: { type: 'airtable', message: store.getState().airtableData[0], tableName: this.state.tableName  } }, '*')
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

  apiKeyValue(event) {
    console.log(event.target.value)
    store.dispatch(getAirtableApi(event.target.value))
  }

  baseIdValue(event) {
    console.log(event.target.value)
    store.dispatch(getAirtableBaseId(event.target.value))
  }

  tableNameValue(event) {
    console.log(event.target.value)
    store.dispatch(getAirtableTableName(event.target.value))
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
            <SubmitButton />
          </form>
        </div>
      </div>
    )
  }
}
export default SignInModal
