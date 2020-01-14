import {store} from "@galette/core";
const {actions: {reportError}} = store;

type Store = {
  dispatch: (action: any) => any;
}

type ErrorHandler = (error: Error) => void;
type ErrorHandlerWithStoreSetter = ErrorHandler & {
  setStore: (store: Store) => void;
}

let _store = null;
const sagaErrorHandler : ErrorHandler = (error: Error) => {
  if (!_store) {
    throw new Error('You need to set the store on the Saga error handler using the `setStore` method.');
  }

  _store.dispatch(reportError(error));
}

const sagaErrorHandlerWithSetter : ErrorHandlerWithStoreSetter = Object.assign(sagaErrorHandler, {
  setStore: store => _store = store,
})

export default sagaErrorHandlerWithSetter;
