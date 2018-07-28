import { typedActionCreatorFactory } from '@galette/core';

import { Action, ReportActionOptions } from "./types";

export const reportError = typedActionCreatorFactory('@Galette/REPORT_ERROR', (error: Error, options?: ReportActionOptions) => ({
  error,
  options,
}));

export const dismissError = typedActionCreatorFactory('@Galette/DISMISS_ERROR', (identifier: string) => ({
  identifier,
}));
