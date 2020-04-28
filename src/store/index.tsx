import {createStore} from "redux"

const reducer = (state={
    //airtableCreds: {}
  }, action) => {

  switch(action.type) {

    case "GET_API": {
      return {
        ...state,
        airApi: action.airtableCreds.airApi,
      }
    }

    case "GET_BASEID": {
      return {
        ...state,
        baseId: action.airtableCreds.baseId,
      }
    }

    case "GET_TABLENAME": {
      return {
        ...state,
        tableName: action.airtableCreds.tableName,
      }
    }

  }
  return state
}

const store = createStore(reducer)

export default store
