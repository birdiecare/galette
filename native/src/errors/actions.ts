import { typedActionCreatorFactory } from '@galette/core';

type Action = any & {
  type: string;
}

export const reportError = typedActionCreatorFactory('@Galette/REPORT_ERROR', (error: Error, action?: Action) => ({
  error,
  action,
}));

export const dismissError = typedActionCreatorFactory('@Galette/DISMISS_ERROR', (identifier: string) => ({
  identifier,
}));
