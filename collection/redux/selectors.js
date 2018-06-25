import { defaultList } from "./reducers";

export const collectionWithItems = (state, listKeyInState) => {
  let list = state[listKeyInState];
  if (!list) {
    list = {
      ...defaultList,
    }
  }

  list.items = list.identifiers.map(identifier => {
    return state[identifier];
  });

  return list;
};
