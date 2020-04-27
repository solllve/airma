import {createStore} from "redux"

const reducer = (state={
    showDoom: true,
    airtableApi: ''
  }, action) => {

  switch(action.type) {

    case "PRAISE_CROM": {
      return {
        showDoom: action.showDoom
      }
    }

    case "GET_API": {
      return {
        ...state,
        airtableApi: action.airtableApi
      }
    }

  }
  return state
}

const store = createStore(reducer)

export default store
