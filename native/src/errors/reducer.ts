import { reportError, dismissError } from "./actions";
import { Error, ReportedError, ErrorModuleState } from "./types";
import { reportedErrors } from "./selectors";

const defaultState : ErrorModuleState = {
  reportedErrors: [],
}

const randomIdentifier = () => Math.random().toString(36).substring(2, 15)

const reducer = (state : ErrorModuleState = defaultState, action) => {
  if (action.type === reportError.type) {
    const reportedError = {
      identifier: randomIdentifier(),
      message: action.error.message,
      triggerAction: action.action
    };

    return {
      ...state,
      reportedErrors: [ ...reportedErrors(state), reportedError ]
    }
  }

  if (action.type === dismissError.type) {
    const errors = reportedErrors(state).filter(
      reportedError => reportedError.identifier !== action.identifier
    );

    return {
      ...state,
      reportedErrors: errors,
    }
  }

  return state;
}

export default reducer;
