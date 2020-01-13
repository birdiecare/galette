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
