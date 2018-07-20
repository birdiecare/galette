export const updateItem = (state = {}, itemIdentifier, itemState) => {
  return {
    ...state,
    [itemIdentifier]: {
      ...state[itemIdentifier],
      ...itemState
    }
  }
};
