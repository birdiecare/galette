import {reduceItems} from "../../../src/store/redux/reducers";

describe('Reducers items', function () {
  it('does reduces each individual item by their IDs', () => {
    const reduced = reduceItems(undefined, {}, {
      items: [{id: 1, name: 'Foo'}, {id: 2, name: 'Bar'}],
      itemIdentifierResolver: item => item.id
    });

    expect(reduced).toEqual({
      1: {id: 1, name: 'Foo'},
      2: {id: 2, name: 'Bar'}
    })
  })
});
