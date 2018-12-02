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
  });

  it('does nothing for an unknown action', () => {
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

    expect(state).toEqual({});
  });

  it('does not do remove the existing items for an unknown action', () => {
    const initialState = {
      list: {
        identifiers: ['abc']
      },
      abc: {
        firstname: 'Sam'
      }
    };

    const state = reduceListAndItems(initialState, { type: 'SOMETHING_COMPLETELY_DIFFERENT' }, {
      actions: {
        starting: 'IT_STARTS',
        succeed: 'IT_WORKED',
        failed: 'IT_FAILED'
      },
      items: [],
      listKeyInState: 'list',
      itemIdentifierResolver: (item : any) => item.id,
    });

    expect(state).toEqual(initialState);
  });
});
