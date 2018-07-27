# Typed Action

`export`ing action types and action creators, that's enough! This "typed action creator"
factory will allow you to refer to the type from the action creator directly.

## Usage

1. Create your action creator.
   ```javascript
   // actions.js

   import { typedActionCreatorFactory } from '@galette/core';

   export const loadUser = typedActionCreatorFactory('LOAD_USER', username => ({ username }));
   ```

2. Uses your action type from the creator
   ```javascript
   // reducers.js
   import { loadUser } from './actions';

   export const someReducer = (state, action) => {
     if (action.type === loadUser.type) {
       // do something...
     }
   }
   ```

3. Enjoy!

## Reference: Action properties

The 2nd parameter of the `typedActionCreatorFactory` is the function that will
transform the arguments given to the action creator to the properties within the
action.

```javascript
const loadTravels = typedActionCreatorFactory('LOAD_TRAVELS', (location, page = 1) => {
  return {
    location,
    page,
  }
});

const action = loadTravels('London', 2);

expect(action).toEqual({
  type: 'LOAD_TRAVELS',
  location: 'Rennes',
  page: 2
})
```
