# Redux Api Middleware

[`redux-api-middleware`](https://github.com/agraboso/redux-api-middleware) is a library
aiming to simplify and normalise API calls via special Redux actions. Galette provides
a set of functions that helps its integration with our [Store module](../store).

## Usage

**Instead** of `import`ing the store functions directly, use the the functions from
this module when you need to reduce `redux-api-middleware` actions, like in the
following example:

```javascript
import { store, ram } from "@birdiecare/galette-core";
const { functions: { updateItem }, reducers: { reduceList, reduceItems } } = store;
const { functions: { payloadResolver, createApiCallReducer } } = ram;

// Identifier resolver for users objects
const userIdentifierResolver = user => user.username;

// `users` reducer
export const users = (state, action) => {
  // ...

  if (action.type.indexOf(LOAD_USER_FOLLOWERS) === 0) {
    let username = action.meta && action.meta.username;

    state = reduceItems(state, action, {
        itemIdentifierResolver: userIdentifierResolver,
        payloadResolver,
    });

    return updateItem(state, username, reduceList(state[username], action, {
        listKeyInState: 'followers_list',
        actionPrefix: LOAD_USER_FOLLOWERS,
        itemIdentifierResolver: userIdentifierResolver,
        payloadResolver,
    }));
  }

  // ...
}
```

This example will reduce the list of followers for a given user. Using the `payloadResolver`
specialised for `redux-api-middleware`, it will reduce each "follower" (which are users)
item individually to prevent any duplication or outdated information in our Redux store
and will then reduce the list of the followers stored within the `followers_list` property
of the user in the store.

Let's illustrate this with a before/action/after example.

**State Before:**
```yaml
users:
  alistair: { username: alistair, email: old@email.com }
  david: { username: david, email: dav@id.com }
  samuel: { username: samuel, email: samuel.roze@gmail.com }
```

**Action**
```yaml
type: LOAD_USER_FOLLOWERS_RECEIVED
payload: [ { username: christelle, email: chri@elle.com }, { username: alistair, email: al@id.com } ]
meta:
  username: samuel
```

**After**
```yaml
users:
  alistair: { username: alistair, email: old@email.com }
  christelle: { username: christelle, email: chri@elle.com }
  david: { username: david, email: dav@id.com }
  samuel:
    username: samuel
    email: samuel.roze@gmail.com
    followers_list:
      identifiers: [ christelle, alistair ]
      # others list properties...
```
