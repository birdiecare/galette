import {reduceList} from "../../../src/store/redux/reducers";

describe('Reduce list of items', () => {
  it('sets the loading status when starting', () => {
    const reduced = reduceList(undefined, {
      type: 'MY_ACTION_SENT',
    }, {
      items: [],
      itemIdentifierResolver: (item : any) => item.id,
      actionPrefix: 'MY_ACTION',
      listKeyInState: 'list'
    })

    expect(reduced).toEqual({
      list: {
        loading: true,
        error: null
      }
    })
  })

  it('sets the error when this happens', () => {
    const reduced = reduceList({
      list: {
        loading: true,
        error: null,
      }
    }, {
      type: 'MY_ACTION_FAILED',
      payload: {
        message: 'Invalid something...'
      }
    }, {
      items: [],
      itemIdentifierResolver: (item : any) => item.id,
      actionPrefix: 'MY_ACTION',
      listKeyInState: 'list'
    })

    expect(reduced).toEqual({
      list: {
        loading: false,
        error: {
          message: 'Invalid something...'
        }
      }
    })
  })

  it('set the list item identifiers', () => {
    const reduced = reduceList({
      list: {
        loading: true,
      }
    }, {
      type: 'MY_ACTION_RECEIVED',
    }, {
      items: [{id: 1, name: 'Foo'}, {id: 2, name: 'Bar'}],
      itemIdentifierResolver: (item : any) => item.id,
      actionPrefix: 'MY_ACTION',
      listKeyInState: 'list'
    })

    expect(reduced).toEqual({
      list: {
        loading: false,
        identifiers: [1, 2],
        total_items: undefined,
        up_to_page: undefined,
      }
    })
  })

  it('supports to specify each action', () => {
    let state = {};
    const reducerOptions = {
      items: [],
      itemIdentifierResolver: (item : any) => item.id,
      actions: {
        starting: 'MY_ACTION_STARTING',
        failed: 'IT_DID_FAIL',
        succeed: 'YAY'
      },
      listKeyInState: 'list'
    };

    state = reduceList(state, { type: 'MY_ACTION_FAILED' }, reducerOptions);
    state = reduceList(state, { type: 'IT_DID_FAIL', error: { oups: 'Meh'} }, reducerOptions);

    expect(state).toEqual({
      list: {
        loading: false,
        error: { oups: 'Meh' }
      }
    })
  })
})
