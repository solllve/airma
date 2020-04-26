import {createStore} from "redux"

const reducer = (state={
    showDoom: true,
    airTable: 'test'
  }, action) => {
  switch(action.type) {
    case "PRAISE_CROM": {
      return {
        showDoom: action.showDoom
      }
    }
    case "GET_AIRTABLE": {
      return {
        airTableData: action.airTable
      }
    }
  }
  return state
}

const store = createStore(reducer)

export default store
