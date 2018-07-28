import { reportError, dismissError } from "./actions";
import { Error, ReportedError, ErrorModuleState } from "./types";

const defaultState : ErrorModuleState = {
  reportedErrors: [],
}

const randomIdentifier = () => Math.random().toString(36).substring(2, 15)

export const reportedErrors = (state: ErrorModuleState & any = defaultState, channel?: string) => {
  const errors = state.reportedErrors || [];

  if (channel === null) {
    return errors;
  }

  return errors.filter(error => error.channel === channel);
}

export const reducer = (state : ErrorModuleState = defaultState, action) => {
  if (action.type === reportError.type) {
    const reportedError = {
      identifier: randomIdentifier(),
      message: action.error.message,
      ...(action.options || {})
    };

    return {
      ...state,
      reportedErrors: [ ...reportedErrors(state, null), reportedError ]
    }
  }

  if (action.type === dismissError.type) {
    const errors = reportedErrors(state, null).filter(
      reportedError => reportedError.identifier !== action.identifier
    );

    return {
      ...state,
      reportedErrors: errors,
    }
  }

  return state;
}
