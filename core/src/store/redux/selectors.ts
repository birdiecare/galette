import {ReducedList} from "./reducers";

const defaultList : ReducedList = {
  identifiers: [],
};

export type ReducedListWithItems = ReducedList & {
  items: any[];
}

export type SelectorOptions = {
  itemResolver?: (identifier: string) => any;
}

export const collectionWithItems = (state : any, listKeyInState : string, options : SelectorOptions = {}) : ReducedListWithItems => {
  let list : ReducedListWithItems = {
    ...defaultList,
    ...state[listKeyInState]
  };

  list.items = list.identifiers.map((identifier : string) => {
    const item = options.itemResolver ? options.itemResolver(identifier) : state[identifier];

    if (!item) {
      console.warn('Could not find item ', identifier);

      return undefined;
    }

    return item;
  }).filter((item : any) => item !== undefined);

  return list;
};
