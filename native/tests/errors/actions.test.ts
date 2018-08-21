import { errors } from '../../src'
const { reducer, actions: { reportError } } = errors;

describe('Action creators', () => {
  it('generates an identifier for the errors', () => {
    const action = reportError(new Error('Foo'));

    expect(action.type).toEqual('@Galette/REPORT_ERROR');
    expect(action.identifier).toBeTruthy();
  })
});
