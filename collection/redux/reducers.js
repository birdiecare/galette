import { updateItem } from "./functions";

export const defaultList = {
  identifiers: [],
  up_to_page: 0,
};

export const reduceListAndItems = (state = {}, action, { actionPrefix, listKeyInState, items, hasMore, itemIdentifierResolver }) => {
  state = reduceItems(state, action, { items, itemIdentifierResolver });

  return reduceList(state, action, {
    actionPrefix,
    listKeyInState,
    items,
    itemIdentifierResolver
  });
};

export const reduceItems = (state = {}, action, { items, itemIdentifierResolver }) => {
  if ('function' === typeof items) {
    items = items(action);
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    state = updateItem(state, itemIdentifierResolver(item), item);
  }

  return state;
};

export const reduceList = (state = {}, action, { actionPrefix, listKeyInState, items, totalItems, itemIdentifierResolver }) => {
  // If the list does not exists.
  if (!state[listKeyInState]) {
    state = updateItem(state, listKeyInState, {
      ...defaultList
    });
  }

  if (action.type === actionPrefix+'_SENT') {
    return updateItem(state, listKeyInState, {
      loading: true,
      error: null,
    });
  }

  if (action.type === actionPrefix+'_RECEIVED') {
    if ('function' === typeof items) {
      items = items(action);
    }

    if ('function' === typeof totalItems) {
      totalItems = totalItems(action);
    }

    const loadedIdentifiers = items.map(itemIdentifierResolver);
    const identifiers = state[listKeyInState].up_to_page < action.meta.page
      // Adds
      ? state[listKeyInState].identifiers.concat(loadedIdentifiers)

      // Replaces
      : loadedIdentifiers;

    return updateItem(state, listKeyInState, {
      identifiers,
      up_to_page: action.meta.page,
      loading: false,
      total_items: totalItems,
    });
  }

  if (action.type === actionPrefix+'_FAILED') {
    return updateItem(state, listKeyInState, {
      loading: false,
      error: action.payload,
    });
  }

  return state;
};
