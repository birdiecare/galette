# Errors

Errors will happen. The network might not be reliable, a 3rd party might not
be available, ... This module provides:

- An automated catch of errors
- A component wrapper to display the errors to the user
- A retry mechanism

## Usage

Once you've [set it up](#setup), you can use the wrapper component to display
a nice error message to your users:

```javascript
import { errors } from '@galette/native'
const { components: { ErrorWrapper }} = errors;

// app.js

const App => () => (
  <Provider store={store}>
    <ErrorWrapper>
      {/** your router/components **/}
    </ErrorWrapper>
  </Provider>
)
```

### Manually Report errors

To programatically report errors, you can simply dispatch an action created by
the `reportError` action creator.

```javascript
// YourComponent.js
import { errors } from '@galette/native'
const { actions: { reportError }} = errors;

class YourComponent extends React.Component
{
  componentWillMount() {
    this.props.reportError(new Error('Something went wrong.'));
  }
}

export default connect(undefined, dispatch => bindActionCreators({
  reportError,
}, dispatch))(YourComponent);
```

## Setup

### reducer

```javascript
import { errors } from '@galette/native'

// Add the reducer to your store...
const reducer = (state, action) => {
  return errors.reducer(
    yourMainReducer,
    action
  );
}
```

### redux-saga

Configure the `onLoad` option of your Saga middleware.

```javascript
const sagaMiddleware = createSagaMiddleware({
  onLoad: error => store.dispatch(reportError(error))
})
```
