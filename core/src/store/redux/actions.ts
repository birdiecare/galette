import { ReportActionOptions, ReportErrorActionCreatorWithType, DismissErrorActionCreatorWithType } from "./types";
import typedActionCreatorFactory from "../../typed-action-creator/factory";

const randomIdentifier = () => Math.random().toString(36).substring(2, 15)

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
