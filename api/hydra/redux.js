import { reduceList as originalReduceList, reduceItems as originalReduceItems } from "../../collection/redux/reducers";

const defaultHydraOptions = options => ({
  items: action => {
    return options.payloadResolver(action)['hydra:member'] || [];
  },
  totalItems: action => {
    return options.payloadResolver(action)['hydra:totalItems'];
  }
});

export function reduceList(state, action, options) {
  return originalReduceList(state, action, {
    ...defaultHydraOptions(options),
    ...options
  });
}

export function reduceItems(state, action, options) {
  return originalReduceItems(state, action, {
    ...defaultHydraOptions(options),
    ...options
  });
}
