import { errors } from '../../src'
const { selectors : { reportedErrors } } = errors;

describe('Select reported errors', () => {
  it('returns an array in any case', () => {
    expect(reportedErrors()).toEqual([]);
  })

  it('returns the reported errors', () => {
    const state = {
      reportedErrors: [
        {identifier: '1234', message: 'Foo'}
      ]
    };

    expect(reportedErrors(state)).toEqual([
      {identifier: '1234', message: 'Foo'}
    ])
  })
});

describe('Select errors based on channels', () => {
  const state = {
    reportedErrors: [
      {identifier: '1234', message: 'Foo'},
      {identifier: '5678', message: 'Bar', channel: 'pictureUploader'},
      {identifier: '9012', message: 'Baz', channel: 'pictureUploader'},
    ]
  };

  it('returns non-channelled messages by default', () => {
    expect(reportedErrors(state)).toEqual([
      {identifier: '1234', message: 'Foo'},
    ])
  })

  it('returns the errors of just a single channel', () => {
    expect(reportedErrors(state, 'pictureUploader')).toEqual([
      {identifier: '5678', message: 'Bar', channel: 'pictureUploader'},
      {identifier: '9012', message: 'Baz', channel: 'pictureUploader'},
    ])
  })

  it('can return all the messages when channel is null', () => {
    expect(reportedErrors(state, null)).toEqual(state.reportedErrors);
  })
})
