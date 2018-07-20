export const updateItem = (state : any = {}, itemIdentifier : string, itemState : any) : any => {
  return {
    ...state,
    [itemIdentifier]: {
      ...(state[itemIdentifier] || {}),
      ...itemState
    }
  }
};
