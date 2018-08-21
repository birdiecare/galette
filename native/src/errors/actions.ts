import { Action } from "redux";
import { typedActionCreatorFactory } from '@galette/core';

import { ReportActionOptions } from "./types";
import { randomIdentifier } from "./functions";

export type ReportErrorAction = Action & {
  error: Error;
  identifier: string;

  options?: ReportErrorAction;
}

type ReportErrorActionCreator = (error: Error, options?: ReportActionOptions, identifier?: string) => ReportErrorAction;
export type ReportErrorActionCreatorWithType = ReportErrorActionCreator & { type: string };

export type DismissErrorAction = Action & {
  identifier: string;
}

type DismissErrorActionCreator = (identifier: string) => DismissErrorAction;
export type DismissErrorActionCreatorWithType = DismissErrorActionCreator & { type: string };

export const reportError : ReportErrorActionCreatorWithType = typedActionCreatorFactory(
  '@Galette/REPORT_ERROR',
  (error: Error, options?: ReportActionOptions, identifier?: string) => ({
    error,
    options,

    identifier: identifier || randomIdentifier(),
  })
);

export const dismissError : DismissErrorActionCreatorWithType = typedActionCreatorFactory(
  '@Galette/DISMISS_ERROR',
  (identifier: string) => ({
    identifier,
  })
);
