import {updateItem} from "../../../src/store/redux/functions";

describe('Update an item of the state', () => {
  it('returns an object even from undefined', () => {
    expect(updateItem(undefined, "1234", {foo: 'bar'})).toEqual({
      "1234": {
        foo: 'bar'
      }
    })
  });

  it('creates an item', () => {
    expect(
      updateItem({}, "1234", {some: 'thing'})
    ).toEqual({
      "1234": {
        some: 'thing'
      }
    });
  });

  it('updates an item without erasing', () => {
    expect(
      updateItem({
        "1234": {
          first: 'thing'
        }
      }, "1234", {
        another: 'one'
      })
    ).toEqual({
      "1234": {
        first: 'thing',
        another: 'one'
      }
    });
  })
});
