import { typedActionCreatorFactory } from '@galette/core';
import { Action } from "./types";

export const reportError = typedActionCreatorFactory('@Galette/REPORT_ERROR', (error: Error, action?: Action) => ({
  error,
  action,
}));

export const dismissError = typedActionCreatorFactory('@Galette/DISMISS_ERROR', (identifier: string) => ({
  identifier,
}));
