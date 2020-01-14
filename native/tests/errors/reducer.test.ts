import { reducer, actions } from '../../src/errors'
const {reportError, dismissError} = actions;

describe('Error reducer', () => {
  it('stores reported errors', () => {
    const state = reducer(undefined, reportError(new Error('Foo')));

    expect(state.reportedErrors).toBeTruthy();
    expect(state.reportedErrors.length).toBe(1);
    expect(state.reportedErrors[0].message).toBe('Foo');
  })

  it('remove dismissed errors', () => {
    const state = reducer({
      // @ts-ignore
      somethingElse: 'foo',
      reportedErrors: [
        {identifier: '0978azerty', message: 'To be investigated'},
        {identifier: '1234qwerty', message: 'Oups.'}
      ]
    }, dismissError('1234qwerty'))

    expect(state).toEqual({
      somethingElse: 'foo',
      reportedErrors: [
        {identifier: '0978azerty', message: 'To be investigated'},
      ]
    })
  })

  it('stores the error options such as the channel', () => {
    const state = reducer(undefined, reportError(new Error('Foo'), { channel: 'foo' }));

    expect(state.reportedErrors).toBeTruthy();
    expect(state.reportedErrors.length).toBe(1);
    expect(state.reportedErrors[0].channel).toBe('foo');
  })
})
