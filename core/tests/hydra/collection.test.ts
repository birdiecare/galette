import HydraCollection from "../../src/hydra/HydraCollection";

describe('An hydra collection', () => {
  it('gets items from the hydra:members', () => {
    const collection = new HydraCollection({
      'hydra:member': [
        {id: 1, name: 'Foo'}
      ]
    })

    expect(collection.items()).toEqual([
      {id: 1, name: 'Foo'}
    ])
  })
})
