import { ram } from "../../src";
const { functions: { createApiCallAction }} = ram;

describe('redux-api-middleware integration', () => {
  it('creates an API call', () => {
    const action = createApiCallAction('MY_DOMAIN_ACTION', {
      url: 'https://google.com',
      method: 'get'
    })

    expect(action).toEqual({
      "@@redux-api-middleware/RSAA": {
        "method": "get",
        "url": "https://google.com",
        "types": [
          {"meta": {}, "type": "MY_DOMAIN_ACTION_SENT"},
          {"meta": {}, "type": "MY_DOMAIN_ACTION_RECEIVED"},
          {"meta": {}, "type": "MY_DOMAIN_ACTION_FAILED"}
        ]
      }
    })
  })
});
