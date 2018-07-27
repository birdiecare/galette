import { typedActionCreatorFactory } from "../../src/index";

describe('Typed action', () => {
  it('returns an action creator for the given type', () => {
    const loadUser = typedActionCreatorFactory('LOAD_USER', user => ({ user }));

    expect(loadUser({ username: 'samuel' })).toEqual({
      type: 'LOAD_USER',
      user: {
        username: 'samuel'
      }
    })
  })

  it('exposes the type as a property of the creator', () => {
    const loadUser = typedActionCreatorFactory('LOAD_USER', user => ({ user }));

    expect(loadUser.type).toEqual('LOAD_USER');
  })

  it('supports multiple arguments', () => {
    const loadTravels = typedActionCreatorFactory('LOAD_TRAVELS', (location, page) => ({ location, page }));

    expect(loadTravels('Rennes', 2)).toEqual({
      type: 'LOAD_TRAVELS',
      location: 'Rennes',
      page: 2
    })
  })
})
