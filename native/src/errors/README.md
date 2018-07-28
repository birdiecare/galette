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

// Add the `errors.reducer` reducer to your store...
const reducer = (state, action) => {
  return errors.reducer(
    yourMainReducer,
    action
  );
}
```

### redux-saga

Integrating `redux-saga` can be done in two (complementary) ways:

1. [Configure the `onLoad` option](#1-onload-method) of your Saga middleware to catch all saga errors
   at once.
2. [Decorate your sagas](#2-saga-decorator-method) for more flexibility and features.

#### 1. `onLoad` method

The `createSagaMiddleware` can take an `onError` callback. Galette ships with one
that will report the error for you.

```javascript
import createSagaMiddleware from 'redux-saga'
import { errors } from '@galette/native'
const { sagaErrorHandler } = errors;

// Create your saga middleware with the `onError` handler
const sagaMiddleware = createSagaMiddleware({
  onError: sagaErrorHandler,
})

// Create your `store`
const store = /* ... */;

// Set the `store` on the saga handler
sagaErrorHandler.setStore(store);
```

This method applies to all the sagas at a time, which gives an very easy first step.
Though, it does not allow to collect the action that failed and therefore you will
not benefit from things like retries. To do so, you will need to decorate your sagas
as described in the next section.

#### 2. Saga decorator method

The basic usage is simply to wrap your generators with the `handleSagaErrors` method:

```javascript
// sagas.js
import { errors } from '@galette/native'
const { handleSagaErrors } = errors;

const mySaga = handleSagaErrors(function*() {
  // Your own saga code...
  // yield ...;
  // ...
});
```

## Channels

Errors might belong to different groups: _global_ errors when something went really
wrong, errors on a login form, while uploading picture, etc... In order to report
and/or display them differently, you can use channels.

### Reporting

When reporting the error, you can set the channel, as a string.

#### Manual reporting

```javascript
store.dispatch(reportError(new Error('Oups'), {
  channel: 'pictureUploader'
}))
```

#### `redux-saga` decorator

```javascript
const mySaga = handleSagaErrors(function*() {
  // Your own saga code...
}, {
  channel: 'pictureUploader'
});
```

### Display channel-ed messages

The `ErrorWrapper` presented in the [Usage](#usage) section supports some properties
as configuration. Use the `channel` property to drill down the messages to a channel:

```javascript
class YourComponent extends React.Component
{
  render() {
    return (
      <ErrorWrapper channel={"pictureUploader"}>
        /* ... yours ... */
      </ErrorWrapper>
    )
  }
}
```
