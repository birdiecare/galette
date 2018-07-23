# Hydra

The [Hydra specification](https://www.w3.org/community/hydra/) is trying to normalise
APIs and starts to get some traction. For example, the [API Platform framework](https://api-platform.com/)
allows you to expose an API following the Hydra specification in minutes.

This module is a super-set of the [Store module](../store#readme) to provide default
payload resolvers.

## Usage

```javascript

import { hydra } from "@galette/core";
const { reduceListAndItems, reduceItems, reduceList } = hydra;

```

Use these functions as you'd the ones coming from the [Store module](../store#readme) 
but you DO NOT need the following options:

- `itemIdentifierResolver`. Get the identifier from the `@id` item.
- `totalItems`. Get them from the `hydra:totalItems` response payload.
- `items`. Gets them from the `hydra:member` response payload.
