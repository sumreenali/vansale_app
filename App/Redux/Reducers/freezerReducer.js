import { GET_CLAIM_CATEGORY, GET_FREEZERS, GET_FREEZER_LIST, CREATE_CLAIM, GET_CLAIM } from "../types"

initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLAIM_CATEGORY:
      return { ...state, category: action.payload }
    case GET_FREEZERS:
      return { ...state, data: action.payload }
    case GET_FREEZER_LIST:
      return { ...state, list: action.payload }
      case CREATE_CLAIM:
      return { ...state, claim: action.payload }
      case GET_CLAIM:
        return {...state, claimList: action.payload}
    default:
      return state
  }
}
