import { GET_BALANCE, GET_POINT_BALANCE, GET_POINT_HISTORY } from "../types"

initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BALANCE:
      return { ...state, data: action.payload }

      case GET_POINT_BALANCE:
        return { ...state, pointBalance: action.payload }

        case GET_POINT_HISTORY:
          return { ...state, pointHistory: action.payload }
  

    default:
      return state
  }
}
