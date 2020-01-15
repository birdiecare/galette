<p align="center"><a href="https://github.com/birdiecare/galette" target="_blank">
    <img src="./assets/galette.png" height="50">
</a></p>

# Galette

Galette is a set of tools, components and screens to be re-used within your applications. Built on the shoulders of
React & Redux, these modules will get you up and running very fast.

## Core

The core contains modules that are generic. They can be used both for React and React Native.

### Installation

```
yarn add @birdiecare/galette-core
```

### Modules

- [**Store**](./core/src/store)<br>
  Reducers, selectors and helpers to store your collections and items in your Redux store.

- [**Typed Action Creator**](./core/src/typed-action-creator)<br>
  No more exporting action types and action creators. Type is within the creator 🙃

- [**Hydra**](./core/src/hydra)<br>
  Super-set of Store, adding specifics for Hydra APIs.

- [**ram** (redux-api-middleware)](./core/src/redux-api-middleware)<br>
  Superset of Store, adding specifics for redux-api-middleware.

## React Native

### Installation

```
yarn add @birdiecare/galette-native
```

### Modules

- [**Loaded entity**](./native/src/loaded-entity)<br>
  Ensure that an entity is loaded before loading the component.

- [**Errors**](./native/src/errors)<br>
  Error handling for humans! Error messages, dismisses, retries, etc...
  mostly automated.

- [**InfiniteScrollView**](./native/src/infinite-scroll-view)<br>
  An easy to use infinite scroll view for your paginated collections.

- [**EmptyState**](./native/src/empty-state)<br>
  Set of screens to be used when nothing has been found.

## React Web

### Installation

```
yarn add @birdiecare/galette-web
```

### Modules

- [**TokenWall**](./web/src/token-wall)<br>
  Adding a simple token wall for your early prototype.
