import { CLEAR_ALL_FILTERS } from "../types"

initialState = {
  clearAllFilters: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ALL_FILTERS:
      return { ...state, clearAllFilters: action.payload }

    default:
      return state
  }
}
