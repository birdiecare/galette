import { CALL_API } from "redux-api-middleware"

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export function createApiCallReducer (actionName) {
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

export function createApiCallAction(actionName, call, meta = {}) {
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
