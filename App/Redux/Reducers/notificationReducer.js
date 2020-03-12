import { GET_NOTIFICATION } from "../types"

initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION:
      return { ...state, data: action.payload }

    default:
      return state
  }
}
