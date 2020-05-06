import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import BaseModal from "./components/BaseModal";
import SignInModal from "./components/SignInModal";
import {connect} from "react-redux"
import './ui.css'

class App extends React.Component {

  render() {
    return (
      <div>
        <SignInModal />
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
