import { runSaga } from 'redux-saga'
import { put } from 'redux-saga/effects'

import { errors } from '../../../src'
const { handleSagaErrors, actions: { reportError } } = errors;

describe('Saga decorator', () => {
  it('reports an error', () => {
    const dispatched = [];
    const saga = runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({}),
    }, handleSagaErrors(function*() {
      throw new Error('Oups.')
    }));

    expect(dispatched).toEqual([
      {
        type: '@Galette/REPORT_ERROR',
        error: new Error('Oups.'),
      }
    ])
  });

  it('forwards the saga arguments', () => {
    const dispatched = [];
    const saga = runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({}),
    }, handleSagaErrors(function*(foo, bar) {
      yield put({ type: 'YAY', foo, bar })
    }), 'one', 'two');

    expect(dispatched).toEqual([
      { type: 'YAY', foo: 'one', bar: 'two' }
    ])
  })

  it('uses specific saga options such as the channel', () => {
    const dispatched = [];
    const saga = runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({}),
    }, handleSagaErrors(function*() {
      throw new Error('Oups.')
    }, {
      channel: 'pictureUploader'
    }));

    expect(dispatched).toEqual([
      {
        type: '@Galette/REPORT_ERROR',
        error: new Error('Oups.'),
        options: {
          channel: 'pictureUploader'
        }
      }
    ])
  })
})
