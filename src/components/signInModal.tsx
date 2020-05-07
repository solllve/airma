import React, { Component } from 'react'
import { useForm } from "react-hook-form";
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
  tableName: string
};

class SignInModal extends Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      airtableApi: '',
      baseId: '',
      tableName: ''
    };
    this.airtableApiChange = this.airtableApiChange.bind(this);
    this.baseIdChange = this.baseIdChange.bind(this);
    this.tableNameChange = this.tableNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div className="airtable__container">
        <SignInHeader />
        <form onSubmit={this.handleSubmit}>

          <input type="text" value={this.state.airtableApi} onChange={this.airtableApiChange} />
          <input type="text" value={this.state.baseId} onChange={this.baseIdChange} />
          <input type="text" value={this.state.tableName} onChange={this.tableNameChange} />

          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
export default SignInModal
