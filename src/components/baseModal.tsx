import React, { Component } from 'react'
import {connect,useSelector, useDispatch} from 'react-redux'

import {getAirtable} from "../store/actions"
import store from '../store'

import Iframe from 'react-iframe'
import AirmaLogo from '../assets/airma-logo.svg'
import '../ui.css'

class BaseModal extends Component {

  componentDidMount() {


  }

  connectToAirtable = () => {
    store.dispatch({
      type: 'GET_API',
      airtableApi: 'keyxu9imGgjUCsm5p'
    })
    var Airtable = require('airtable');

    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: 'keyxu9imGgjUCsm5p'
    });

    var base = Airtable.base('appsN1xTPJYU0WIZC');

    base('Personas').select({
    }).eachPage(function page(records, fetchNextPage) {

      records.map( function(data) {
        console.log(data.fields)
      });

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    console.log(store.getState())
  }

  render() {

    return (
      <div className="airtable__container">
        <div className="airtable__container-fields-inner">
          <div className="airma__logo">
            <img src={AirmaLogo} width="150" />
          </div>
          <form>

          </form>
          <input name="baseID" className="input__field" type="text" placeholder="Base ID" />
          <input name="apiKey" className="input__field" type="password" placeholder="API Key" />
          <input onClick={this.connectToAirtable} className="input__submit" type="button" value="Connect to Airtable" />
        </div>
      </div>
    )
  }
}
export default BaseModal
