import { GET_STOCK_LIST, GET_VANSALES_DROPDOWN } from "../types"

initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK_LIST:
      return { ...state, data: action.payload }
    default:
      return state
  }
}
