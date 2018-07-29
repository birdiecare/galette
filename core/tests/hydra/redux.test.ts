import {reduceListAndItems} from "../../src/hydra/redux";

describe('Reducing a list & items', () => {
  const action = {
    type: 'SOMETHING_RECEIVED',
    payload: {
      'hydra:member': [
        {'@id': '/users/1', id: '1', name: 'Sam'},
        {'@id': '/users/2', id: '2', name: 'Al'},
      ]
    }
  };

  it('gets the items from the response', () => {
    const state = reduceListAndItems({}, action, {
      payloadResolver: (action) => action.payload,
      actionPrefix: "SOMETHING",
      listKeyInState: "list",
    });

    expect(state).toEqual({
      "/users/1": {"@id": "/users/1", "id": "1", "name": "Sam"},
      "/users/2": {"@id": "/users/2", "id": "2", "name": "Al"},
      "list": {
        "identifiers": ["/users/1", "/users/2"],
        "loading": false,
        "total_items": undefined,
        "up_to_page": undefined
      }
    })
  })

  it('allow to override options', () => {
    const state = reduceListAndItems({}, action, {
      payloadResolver: (action) => action.payload,
      actionPrefix: "SOMETHING",
      listKeyInState: "list",
      itemIdentifierResolver: item => item.id,
    });

    expect(state).toEqual({
      "1": {"@id": "/users/1", "id": "1", "name": "Sam"},
      "2": {"@id": "/users/2", "id": "2", "name": "Al"},
      "list": {
        "identifiers": ["1", "2"],
        "loading": false,
        "total_items": undefined,
        "up_to_page": undefined
      }
    })
  })
})
