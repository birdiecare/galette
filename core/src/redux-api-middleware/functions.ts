let CALL_API : string;
try {
  CALL_API = require("redux-api-middleware").CALL_API;
} catch (e) {
  CALL_API = 'MODULE_NOT_INSTALLED';
}

import {Action} from "redux";
import { createMappedReducer } from "../store/redux/functions";

// BC-layer: start
// Backward compatible layer for the `createReducer` function moved to the store module.

export type ReducerHandler = (state : object, action: Action) => any;
export type ReducerHandlers = {
  [actionName: string]: ReducerHandler;
}

export const createReducer = createMappedReducer;
// BC-layer end

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
