function newNotification(state, payload) {
  if (state[0] && state[0]._id == payload._id) {
    return state;
  } else {
    return [payload, ...state];
  }
}

function remove(state, payload) {
  state = state.filter((notification) => {
    return notification._id !== payload._id;
  });
  return state;
}

export const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case "setNotification":
      return newNotification(state, action.payload);
    case "removeNotification":
      return remove(state, action.payload);
    default:
      return state;
  }
};
