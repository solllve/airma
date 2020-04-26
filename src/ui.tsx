import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import ShowDoomComponent from "./components/Hello";
import {connect} from "react-redux"
import './ui.css'

class App extends React.Component {

  componentDidMount() {

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

  }

  render() {
    //onmessage = (event) => {
    //  console.log(event.data.pluginMessage)
    //}
    const getit = store.getState()
    const showDoom = getit.showDoom
    if (showDoom) {
      return showDoom
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-page')
)
