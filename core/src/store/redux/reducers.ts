import { updateItem } from "./functions";

export type Action = {
  type: string;

  [x: string]: any;
}
export type ItemsResolver = (action: Action) => any[];
export type ItemsOption = any[] | ItemsResolver;
export type ReduceItemsOptions = {
  items: ItemsOption;
  itemIdentifierResolver: (item: object) => string;
  itemTransformer?: (item : object) => object;
};

export type ReduceListOptions = ReduceItemsOptions & {
  actionPrefix: string;
  listKeyInState: string;

  totalItems?: (action: Action) => number;
};

export type ReducedList = {
  identifiers: string[];

  up_to_page?: number;
  loading?: number;
  error?: any;
  total_items?: number;
};

export const reduceListAndItems = (state = {}, action : Action, options : ReduceListOptions) => {
  return reduceList(
    reduceItems(
      state,
      action,
      options
    ),
    action,
    options
  );
};

function itemsFromAction(action: Action, options: ReduceItemsOptions) {
  let items = 'function' === typeof options.items
    ? options.items(action)
    : options.items;

  if (options.itemTransformer) {
    items = items.map(options.itemTransformer);
  }

  return items;
}

export const reduceItems = (state = {}, action : Action, options : ReduceItemsOptions) => {
  let items = itemsFromAction(action, options);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    state = updateItem(state, options.itemIdentifierResolver(item), item);
  }

  return state;
};

export const reduceList = (state : any = {}, action : Action, options : ReduceListOptions) : ReducedList => {
  // If the list does not exists.
  if (!state[options.listKeyInState]) {
    state = updateItem(state, options.listKeyInState, {});
  }

  if (action.type === options.actionPrefix+'_SENT') {
    return updateItem(state, options.listKeyInState, {
      loading: true,
      error: null,
    });
  }

  if (action.type === options.actionPrefix+'_RECEIVED') {
    const items = itemsFromAction(action, options);
    const totalItems = 'function' === typeof options.totalItems
      ? options.totalItems(action)
      : undefined;

    const loadedIdentifiers = items.map(options.itemIdentifierResolver);
    const identifiers = action.meta && state[options.listKeyInState].up_to_page < action.meta.page
      // Adds
      ? state[options.listKeyInState].identifiers.concat(loadedIdentifiers)

      // Replaces
      : loadedIdentifiers;

    return updateItem(state, options.listKeyInState, {
      identifiers,
      up_to_page: action.meta && action.meta.page,
      loading: false,
      total_items: totalItems,
    });
  }

  if (action.type === options.actionPrefix+'_FAILED') {
    return updateItem(state, options.listKeyInState, {
      loading: false,
      error: action.payload,
    });
  }

  return state;
};
