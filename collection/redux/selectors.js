import { defaultList } from "./reducers";

export const collectionWithItems = (state, listKeyInState, options = {}) => {
  let list = {
    ...defaultList,
    ...state[listKeyInState]
  };

  list.items = list.identifiers.map(identifier => {
    const item = options.itemResolver ? options.itemResolver(identifier) : state[identifier];

    if (!item) {
      console.warn('Could not find item ', identifier);

      return undefined;
    }

    return item;
  }).filter(item => item !== undefined);

  return list;
};
