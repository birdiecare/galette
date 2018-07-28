import { errors } from '../../../src'
const { sagaErrorHandler, actions: { reportError } } = errors;

describe('Error handler for the saga', () => {
  it('throws an error if store was not set', () => {
    sagaErrorHandler.setStore(null);
    expect(() => sagaErrorHandler(new Error('Oups.'))).toThrow(Error);
  })

  it('dispatches an action', () => {
    const dispatchedActions = [];

    sagaErrorHandler.setStore({
      dispatch: action => dispatchedActions.push(action)
    })

    sagaErrorHandler(new Error('Oups.'));

    expect(dispatchedActions).toEqual([
      reportError(new Error('Oups.'))
    ])
  })
})
