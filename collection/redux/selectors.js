import { defaultList } from "./reducers";

export const collectionWithItems = (state, listKeyInState) => {
  let list = state[listKeyInState];
  if (!list) {
    list = {
      ...defaultList,
    }
  }

  list.items = list.identifiers.map(identifier => {
    const item = state[identifier];

    if (!item) {
      console.warn('Could not find item ', identifier);

      return undefined;
    }

    return item;
  }).filter(item => item !== undefined);

  return list;
};
