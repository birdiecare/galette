import {reduceListAndItems} from "../../src/hydra/redux";

describe('Redux shortcuts for Hydra responses', () => {
  it('gets the items from the response', () => {
    const state = reduceListAndItems(
      {},
      {
        type: 'SOMETHING_RECEIVED',
        payload: {
          'hydra:member': [
            {'@id': '/users/1', name: 'Sam'},
            {'@id': '/users/2', name: 'Al'},
          ]
        }
      },
      {
        payloadResolver: (action) => action.payload,
        actionPrefix: "SOMETHING",
        listKeyInState: "list",
      }
    );

    expect(state).toEqual({
      "/users/1": {"@id": "/users/1", "name": "Sam"},
      "/users/2": {"@id": "/users/2", "name": "Al"},
      "list": {
        "identifiers": ["/users/1", "/users/2"],
        "loading": false,
        "total_items": undefined,
        "up_to_page": undefined
      }
    })
  })
})