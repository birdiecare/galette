export type Error = {
  message: string;
};

export type ReportedError = {
  // The unique identifier of the error
  identifier: string;

  // The error
  message: string;

  // The original action that triggered this error
  triggerAction?: any;
}

// State
export type ErrorModuleState = {
  reportedErrors: ReportedError[];
}
