<p align="center"><a href="https://github.com/kametventures/galette" target="_blank">
    <img src="./assets/galette.png" height="50">
</a></p>

# Galette

Galette is a set of tools, components and screens to be re-used within your applications. Built on the shoulders of
React & Redux, these modules will get you up and running very fast.

## Core

The core contains modules that are generic. They can be used both for React and React Native.

### Installation

```
yarn add @galette/core
```

### Modules

- [**Store**](./core/src/store)<br>
  Reducers, selectors and helpers to store your collections and items in your Redux store.

- [**Hydra**](./core/src/hydra)<br>
  Super-set of Store, adding specifics for Hydra APIs.

- [**ram** (redux-api-middleware)](./core/src/redux-api-middleware)<br>
  Superset of Store, adding specifics for redux-api-middleware.

## React Web

### Installation

```
yarn add @galette/web
```

### Modules

- [**TokenWall**](./web/src/token-wall)<br>
  Adding a simple token wall for your early prototype.

## React Native

### Installation

```
yarn add @galette/native
```

### Modules

- [**InfiniteScrollView**](./native/src/infinite-scroll-view)<br>
  An easy to use infinite scroll view for your paginated collections.

- [**EmptyState**](./native/src/empty-state)<br>
  Set of screens to be used when nothing has been found.
