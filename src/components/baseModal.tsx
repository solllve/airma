import React, { Component } from 'react'
import {connect,useSelector, useDispatch} from 'react-redux'

import {
  getAirtableApi,
  getAirtableBaseId,
  getAirtableTableName,
  getAirtableData
} from "../store/actions"

import store from '../store'
import Iframe from 'react-iframe'
import AirmaLogo from '../assets/airma-logo.svg'
import '../ui.css'

class BaseModal extends Component {

  connectToAirtable = () => {

    //let airTableApi = store.getState().airApi;
    //let baseId = store.getState().baseId;
    //let tableName = store.getState().tableName;

    let airTableApi = 'keyxu9imGgjUCsm5p';
    let baseId = 'appsN1xTPJYU0WIZC';
    let tableName = 'Personas';

    var Airtable = require('airtable');

    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: airTableApi
    });

    var base = Airtable.base(baseId);

    base(tableName).select({
    }).eachPage(function page(records, fetchNextPage) {

      records.map( function(data) {
        store.dispatch(getAirtableData(data.fields))
        //console.log(store.getState().airtableData)
      });

    }, function done(err) {
        if (err) {
          alert(err)
          return;
        }
    });

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

  render() {

    return (
      <div className="airtable__container">
        <div className="airtable__container-fields-inner">
          <div className="airma__logo">
            <img src={AirmaLogo} width="150" />
          </div>
          <input onChange={this.apiKeyValue} name="apiKey" className="input__field" type="password" placeholder="API Key" />
          <input onChange={this.baseIdValue} name="baseID" className="input__field" type="text" placeholder="Base ID" />
          <input onChange={this.tableNameValue} name="tableName" className="input__field" type="text" placeholder="Table Name" />
          <input onClick={this.connectToAirtable} className="input__submit" type="button" value="Connect to Airtable" />
        </div>
      </div>
    )
  }
}
export default BaseModal
