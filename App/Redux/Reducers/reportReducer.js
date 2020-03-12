import { USER_REPORT, USER_REPORT_TITLE, USER_TOP_PRODUCTS_REPORT } from "../types"

initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_REPORT:
      return { ...state, data: action.payload }

    case USER_REPORT_TITLE:
      return { ...state, title: action.payload }

      case USER_TOP_PRODUCTS_REPORT:
        return { ...state, dataTopProducts: action.payload }

    default:
      return state
  }
}
