import { runSaga } from 'redux-saga'
import { put } from 'redux-saga/effects'

import { errors } from '../../../src'
const { handleSagaErrors } = errors;

describe('Saga decorator', () => {
  it('reports an error', () => {
    const dispatched = [];
    const saga = runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({}),
    }, handleSagaErrors(function*() {
      throw new Error('Oups.')
    }));

    expect(dispatched.length).toBe(1);
    expect(dispatched[0].type).toBe('@Galette/REPORT_ERROR');
    expect(dispatched[0].error).toEqual(new Error('Oups.'));
  });

  it('forwards the saga arguments', () => {
    const dispatched = [];
    const saga = runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({}),
    }, handleSagaErrors(function*(foo, bar) {
      yield put({ type: 'YAY', foo, bar })
    // @ts-ignore
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
    }, handleSagaErrors(function* () {
      throw new Error('Oups.')
    }, {
      channel: 'pictureUploader'
    }));

    expect(dispatched.length).toBe(1);
    expect(dispatched[0].error).toEqual(new Error('Oups.'));
    expect(dispatched[0].options).toEqual({
      channel: 'pictureUploader'
    });
  })
})
