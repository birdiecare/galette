import { store, ReportErrorAction, DismissErrorAction, ErrorModuleState } from "@birdiecare/galette-core";

const {actions: {reportError, dismissError } } = store;
const { functions: { createMappedReducer } } = store;

const defaultState : ErrorModuleState = {
  reportedErrors: [],
};

export const reportedErrors = (state: ErrorModuleState & any = defaultState, channel?: string) => {
  const errors = state.reportedErrors || [];

  if (channel === null) {
    return errors;
  }

  return errors.filter(error => error.channel === channel);
};

export const reducer = createMappedReducer(defaultState, {
  [reportError.type]: (state: ErrorModuleState, action: ReportErrorAction) => {
    const reportedError = {
      identifier: action.identifier,
      message: action.error.message,
      ...(action.options || {})
    };

    return {
      ...state,
      reportedErrors: [ ...reportedErrors(state, null), reportedError ]
    }
  },

  [dismissError.type]: (state: ErrorModuleState, action: DismissErrorAction) => {
    const errors = reportedErrors(state, null).filter(
      reportedError => reportedError.identifier !== action.identifier
    );

    return {
      ...state,
      reportedErrors: errors,
    }
  }
});
