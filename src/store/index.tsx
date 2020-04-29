import {createStore} from "redux"

const reducer = (state={
        airApi: '',
        baseId: '',
        tableName: '',
        airtableData: []
  }, action) => {

  switch(action.type) {

    case "GET_API": {
      return {
        ...state,
        airApi: action.airApi
      }
    }

    case "GET_BASEID": {
      return {
        ...state,
        baseId: action.baseId
      }
    }

    case "GET_TABLENAME": {
      return {
        ...state,
        tableName: action.tableName
      }
    }

    case "GET_AIRTABLE_DATA": {
      return {
        ...state,
        airtableData: action.airtableData
      }
    }

  }
  return state
}

const store = createStore(reducer)

export default store
