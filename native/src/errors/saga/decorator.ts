import { put } from 'redux-saga/effects'
import { reportError } from "../actions";
import { Action } from "../types";

export default function handleSagaErrors(generator) {
  return function*(action : Action, ...rest : any[]) {
    try {
      yield* generator.apply(null, [ action, ...rest ]);
    } catch (e) {
      yield put(reportError(e, action));
    }
  }
}
