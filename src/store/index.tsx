import {createStore} from "redux"

const reducer = (state={
        airApi: '',
        baseId: '',
        tableName: ''
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

  }
  return state
}

const store = createStore(reducer)

export default store
