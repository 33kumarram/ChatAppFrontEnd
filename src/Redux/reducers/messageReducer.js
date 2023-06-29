function update(state, payload) {
  let lmessage = state[state.length - 1];
  if (lmessage && lmessage._id == payload._id) {
    return state;
  }
  return [...state, payload];
}

export const messageReducer = (state = [], action) => {
  switch (action.type) {
    case "setChatMessages":
      return action.payload;
    case "updateNewMessage":
      return update(state, action.payload);
    default:
      return state;
  }
};
