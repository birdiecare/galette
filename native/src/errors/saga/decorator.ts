import { put } from 'redux-saga/effects'

import { reportError } from "../actions";
import { Action, ReportActionOptions } from "../types";

export default function handleSagaErrors(generator, options?: ReportActionOptions) {
  return function*(action?: Action, ...rest: any[]) {
    try {
      yield* generator.apply(null, [ action, ...rest ]);
    } catch (e) {
      let reportErrorOptions = options !== undefined ? { ...options } : undefined;
      if (action !== undefined) {
        reportErrorOptions = { ...(reportErrorOptions || {}), triggerAction: action };
      }

      yield put(reportError(e, reportErrorOptions));
    }
  }
}
