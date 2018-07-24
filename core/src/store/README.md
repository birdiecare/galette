# Store

Using an extensible and well-organised store structure is one of the most important things when using Redux. If you are
not sure or want to know more about this, you should read [this article](https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5).

We have built a set of functions that allow you to store items and lists in an organised manner with almost no effort.
Have a look to [how it will store your data](#how-is-it-stored) at the bottom of the file.

## Usage

In order to make the documentation easy to reason about, we will describe here the different use cases you can encouter
while dealing with lists and items:

1. [Simple list of items](#simple-list-of-items)
1. [List of items belonging to another one](#list-of-items-belonging-to-another-one)
1. [Custom action names](#custom-action-names)

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

    // How to get the payload from a "success" action
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

### List of items belonging to another one

Let's imagine that on top of our users (explained in the previous example), each
of them gave a list of travels. We want to reduce the travel items in their own
`travels` reducer so we don't have duplicates but we want to store the list on
the user item.

```javascript
// reducers.js

import { store } from "@galette/core";
const { reducers: { reduceList, reduceItems }, functions: { updateItem }} = store;

const travelIdentifierResolver = item => item.uuid;
const payloadResolver = action => action.payload;

export const users = (state, action) => {
  if (action.type.indexOf(LOAD_USER_TRAVELS) === 0) {
    const { username } = action;

    return updateItem(state, username, reduceList(state[username], action, {
      listKeyInState: 'travels',
      actionPrefix: LOAD_USER_TRAVELS,
      itemIdentifierResolver: travelIdentifierResolver,
      payloadResolver,
    }));
  }
}

export const travels = (state, action) => {
  if (action.type.indexOf(LOAD_USER_TRAVELS) === 0) {
    return reduceItems(state, action, {
      itemIdentifierResolver: travelIdentifierResolver,
      payloadResolver
    })
  }
}
```

You can now use the selector to get the travels of a given user in your component:
```javascript
// component.js

import { store } from "@galette/core";
const { selectors: { collectionWithItems }} = store;

class UserTravelList extends Component
{
  render() {
    console.log('travels of user "'+this.props.user.username+'": ', this.props.travels);
  }
}

export default connect((state, props) => ({
  travels: collectionWithItems(props.user, 'travels', {
    itemResolver: identifier => {
        return state.travels[identifier];
    }
  }),
}))(UserTravelList);
```

### Custom action names

If you don't use actions ending with `_SENT`, `_SUCCESS` or `_FAILED`, you need to specify which actions should be
considered by the reducer.

Here is an example with the `reduceListAndItems` method (though it works for all of them):
```javascript
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

### Example: Users with a list of travels

- `users`
  - `1234` (_user identifier_)
    - `travels`
      - `identifiers`. List of the travel identifiers. Example: `["1234"]`
      - `loading`. Boolean
      - `error`. An error if any.

- `travels`
  - `1234` (_travel identifier_)
    - `name`
    - _other travel properties..._
