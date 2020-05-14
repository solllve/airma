import {createStore} from "redux"

const reducer = (state={
        airApi: 'keyxu9imGgjUCsm5p',
        baseId: 'appsN1xTPJYU0WIZC',
        tableName: 'Personas',
        airtableData: [],
        fetchUrl: false
  }, action) => {

  switch(action.type) {

    case "GET_API": {
      return {
        airApi: action.airApi
      }
    }

    case "GET_BASEID": {
      return {
        baseId: action.baseId
      }
    }

    case "GET_TABLENAME": {
      return {
        tableName: action.tableName
      }
    }

    case "GET_CONNECTION": {
      return {
        fetchUrl: action.fetchUrl
      }
    }

    case "GET_AIRTABLE_DATA": {
      return {
        airtableData: [...state.airtableData, action.airtableData]
      }
    }

  }
  return state
}

const store = createStore(reducer)

export default store
