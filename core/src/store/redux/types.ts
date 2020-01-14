import { Action } from "redux";

export type Error = {
  message: string;
};

// Actions
export type ReportedError = {
  // The unique identifier of the error
  identifier: string;

  // The error
  message: string;
} & ReportActionOptions;

export type ReportActionOptions = {
  triggerAction?: Action;
  channel?: string;
  message?: string;
  skipDisplay?: boolean;
  skipCapture?: boolean;
}

// State
export type ErrorModuleState = {
  reportedErrors: ReportedError[];
}

export type ReportErrorAction = Action & {
  error: Error;
  identifier: string;

  options?: ReportActionOptions;
}

type ReportErrorActionCreator = (error: Error, options?: ReportActionOptions, identifier?: string) => ReportErrorAction;
export type ReportErrorActionCreatorWithType = ReportErrorActionCreator & { type: string };

export type DismissErrorAction = Action & {
  identifier: string;
}

type DismissErrorActionCreator = (identifier: string) => DismissErrorAction;
export type DismissErrorActionCreatorWithType = DismissErrorActionCreator & { type: string };
