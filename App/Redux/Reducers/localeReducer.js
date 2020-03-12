initialState = {
    
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "LOCALE_TOGGLE":
      return { ...state, data: action.payload };

    default:
      return state;
  }
}
