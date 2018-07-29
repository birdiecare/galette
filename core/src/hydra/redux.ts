import {
  reduceList as originalReduceList,
  reduceItems as originalReduceItems,
  reduceListAndItems as originalReduceListAndItems,
  Action,
  ReduceListOptions, ActionLifecycleOptions,
} from "../store/redux/reducers";

export type HydraOptions = ActionLifecycleOptions & {
  listKeyInState: string;
  payloadResolver: (action : Action) => any;
}

const addDefaultHydraOptions = (options : HydraOptions) : ReduceListOptions => {
  const {payloadResolver, ...rest} = options;

  return {
    itemIdentifierResolver: (item: any) => {
      return item['@id'];
    },
    items: (action: Action) => {
      return payloadResolver(action)['hydra:member'] || [];
    },
    totalItems: (action: Action) => {
      return payloadResolver(action)['hydra:totalItems'];
    },
    ...rest
  }
};

export function reduceList(state : object, action : Action, options : HydraOptions) {
  return originalReduceList(state, action, addDefaultHydraOptions(options));
}

export function reduceItems(state : object, action : Action, options : HydraOptions) {
  return originalReduceItems(state, action, addDefaultHydraOptions(options));
}

export function reduceListAndItems(state : object, action : Action, options : HydraOptions) {
  return originalReduceListAndItems(state, action, addDefaultHydraOptions(options))
}
