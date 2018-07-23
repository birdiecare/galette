# Store

Using an extensible and well-organised store structure is one of the most important things when using Redux. If you are
not sure or want to know more about this, you should read [this article](https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5).

We have built a set of functions that allow you to storing items and lists in an organised manner with almost effort.
Have a look to [how it will store your data](#how-is-it-stored) at the bottom of the file.

## Usage

In order to make the documentation easy to reason about, we will describe here the different use cases you can encouter
while dealing with lists and items:

1. [Simple list of items](#simple-list-of-items)

### Simple list of items

Let's use a list of users as our example.

1. You need to create your reducer. Use the `reduceListAndItems` helper to reduce both the list and each idividual item.

```javascript
// reducer.js

import { store } from "@galette/core";
const { reducers: { reduceListAndItems }} = store;

export default const reducer = (state, action) => {
  return reduceListAndItems(state, action, {
    // The prefix for each of the actions to handle
    actionPrefix: 'LOAD_USERS',

    // In your `state`, the key to be used for the list.
    listKeyInState: 'list',

    // A function responsible of extracting the identifier for each item
    itemIdentifierResolver: item => item.id,

    // How to get the payload from a "sucess" action
    payloadResolver: action => action.payload
  });
}
```

2. To get the list with your items, use the provided selector. Here is an example of a connected component:

```javascript
// component.js

import { store } from "@galette/core";
const { selectors: { collectionWithItems }} = store;

class UserList extends Component
{
  render() {
    console.log('render these users: ', this.props.users);
  }
}

export default connect(state => ({
  users: collectionWithItems(state, 'list'),
}))(UserList);
```

### Custom action names

If you don't use actions ending with `_SENT`, `_SUCCESS` or `_FAILED`, you need to specify which actions should be
considered by the reducer.

Here is an example with the `reduceListAndItems` method (though it works for all of them):
```
reduceListAndItems(state, action, {
  // other options...
  actions: {
    starting: 'LOADING_USERS',
    failed: 'FAILED_USERS',
    succeed: 'LOADED_USERS'
  }
});
```

## Functions

1. [`updateItem(state, identifier, propertiesToUpdate)`](#updateitem)<br>
   Patch a set of properties of an item in a state.

### `updateItem`

Partially update an item in a list or object.

```
import { store } from "@galette/core"
const { functions: { updateItem } } = store;

expect(
 updateItem(
   {"1234": {"name": "foo", "type": "bar"}},
   "1234",
   {"type": "baz"}
 )
).toEqual(
 {"1234": {"name": "foo", "type", "baz"}}
}
```

## How is it stored?

Everything is resource-centric. It means it will not store duplicated resources. These resources will be indexed by
identifier and the lists will only refer to identifiers.

### Example: Simple list of users

The store will look like this:

- `users`
  - `list`
    - `identifiers` <br>
      An array of identifiers, like `["1234", "5678"]`.
    - `loading` A boolean
    - `error`. A error, if some.
    - `up_to_page`. The page at which the list is.
  - `1234`
    - `username`
    - `email`
  - `5678`
    - `username`
    - `email`
