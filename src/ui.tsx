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
