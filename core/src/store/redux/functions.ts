import {Action} from "./reducers";

export const updateItem = (state : any = {}, itemIdentifier : string, itemState : any) : any => {
  return {
    ...state,
    [itemIdentifier]: {
      ...(state[itemIdentifier] || {}),
      ...itemState
    }
  }
};

type AnyAction = Action & any;
type AnyReducer<StateType> = (state: StateType, action: AnyAction) => StateType;
type ReducerMapping<StateType> = {
  [type: string]: AnyReducer<StateType>;
};

export function createMappedReducer<StateType>(initialState : StateType, mapping : ReducerMapping<StateType>) {
  return (state : StateType = initialState, action : any) => {
    if (action.type in mapping) {
      return mapping[action.type](state, action);
    }

    return state;
  };
}
