const accountReducer = (state, action) => {
  switch(action.type) {
    case 'SET_ACCOUNT':
      return action.account;
    case 'EDIT_ACCOUNT':
      return {
        ...state,
        ...action.updates
      }
    default:
      return state;
  }
}

export default accountReducer;