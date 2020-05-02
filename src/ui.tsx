import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import BaseModal from "./components/BaseModal";
import {connect} from "react-redux"
import './ui.css'

class App extends React.Component {


  render() {
    //onmessage = (event) => {
    //  console.log(event.data.pluginMessage)
    //}
    //const getit = store.getState()
    //const showDoom = getit.showDoom
    window.onmessage = async (event) => {
      if (event.data.pluginMessage.type === 'networkRequest') {
        var request = new XMLHttpRequest()
        // This link has random lorem ipsum text
        request.open('GET', 'https://cors-anywhere.herokuapp.com/http://www.randomtext.me/download/text/lorem/ul-8/5-15')
        request.responseType = 'text'
        request.onload = () => {
          window.parent.postMessage({pluginMessage: request.response}, '*')
        };
        request.send()
      }
    }
      return (
        <div>
          <BaseModal />
        </div>
      )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-page')
)
