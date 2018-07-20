import {collectionWithItems} from "../../../src/store/redux/selectors";

describe('Selector for a collection', () => {
  it('gets the list with items', () => {
    const state = {
      list: {
        identifiers: [1, 2]
      },
      1: {name: 'Foo'},
      2: {name: 'Bar'}
    };

    expect(collectionWithItems(state, 'list')).toEqual({
      identifiers: [1, 2],
      items: [
        {name: 'Foo'},
        {name: 'Bar'}
      ]
    })
  })
});
