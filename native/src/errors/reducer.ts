import { TYPE_REPORT_ERROR } from "./actions";
import { Error } from "./types";

type ReportedError = {
  // The unique identifier of the error
  identifier: string;

  // The error
  error: Error;

  // The original action that triggered this error
  triggerAction?: any;
}

type ErrorModuleState = {
  reportedErrors: Error[];
}

const defaultState : ErrorModuleState = {
  reportedErrors: [],
}

const randomIdentifier = () => Math.random().toString(36).substring(2, 15)

const reducer = (state : ErrorModuleState = defaultState, action) => {
  if (action.type === TYPE_REPORT_ERROR) {
    return {
      ...state,
      reportedErrors: [ ...state.reportedErrors, {
        identifier: randomIdentifier()
        error: action.error,
        triggerAction: action.action
      }]
    }
  }
}
