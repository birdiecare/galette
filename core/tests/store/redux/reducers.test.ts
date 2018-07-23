import {reduceListAndItems} from "../../../src/store/redux/reducers";

describe('Reducers for list & items', () => {
  it('sets the list default', () => {
    const state = reduceListAndItems(undefined, { type: 'IT_STARTS' }, {
      actions: {
        starting: 'IT_STARTS',
        succeed: 'IT_WORKED',
        failed: 'IT_FAILED'
      },
      items: [],
      listKeyInState: 'a-list',
      itemIdentifierResolver: (item : any) => item.id,
    })

    expect(state).toEqual({
      "a-list": {
        error: null,
        loading: true
      }
    })
  })

  it('does not do anything for an unknown action', () => {
    const state = reduceListAndItems(undefined, { type: 'SOMETHING_COMPLETELY_DIFFERENT' }, {
      actions: {
        starting: 'IT_STARTS',
        succeed: 'IT_WORKED',
        failed: 'IT_FAILED'
      },
      items: [],
      listKeyInState: 'a-list',
      itemIdentifierResolver: (item : any) => item.id,
    })

    expect(state).toEqual({"a-list": {}});
  })
});
