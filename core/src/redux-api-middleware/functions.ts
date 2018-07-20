import { CALL_API } from "redux-api-middleware"
import {Action} from "../store/redux/reducers";

export type ReducerHandler = (state : object, action: Action) => any;
export type ReducerHandlers = {
  [actionName: string]: ReducerHandler;
}

export function createReducer(initialState : object, handlers : ReducerHandlers) {
  return function reducer(state = initialState, action : Action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export function createApiCallReducer(actionName: string) {
  return createReducer({
    result: null,
    error: null,
    loading: false
  }, {
    [actionName+"_SENT"](state) {
      return { ...state, loading: true, error: null }
    },
    [actionName+"_RECEIVED"](state, action) {
      return { ...state, loading: false, result: action.payload, error: null }
    },
    [actionName+"_FAILED"](state, action) {
      return { ...state, loading: false, error: action.payload }
    },
  })
}

export function createApiCallAction(actionName : string, call : object, meta : object = {}) {
  return {
    [CALL_API]: {
      ...call,
      types: [
        {type: actionName+"_SENT", meta},
        {type: actionName+"_RECEIVED", meta},
        {type: actionName+"_FAILED", meta}
      ]
    }
  }
}

export function payloadResolver(action : any) {
  return action.payload || {};
}
