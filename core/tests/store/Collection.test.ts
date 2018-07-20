import Collection from "../../src/store/Collection";

describe('A collection of items', () => {
  it('returns an empty array when empty', () => {
    const collection = new Collection({});

    expect(collection.items()).toEqual([]);
  })
});
