import { ReportActionOptions } from "./types";
import typedActionCreatorFactory from "../../typed-action-creator/factory";
import {Action} from "redux";

const randomIdentifier = () => Math.random().toString(36).substring(2, 15)

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
