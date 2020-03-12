import { CLEAR_ALL_FILTERS } from "../types"

export function clearAllFilters() {
  return {
    type: CLEAR_ALL_FILTERS,
    payload: true,
  }
}
