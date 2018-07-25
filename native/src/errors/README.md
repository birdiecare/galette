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

## Setup
