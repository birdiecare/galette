import ErrorWrapper from "./components/ErrorWrapper";
import ErrorMessage from "./components/ErrorMessage";
import middleware from "./middleware";
import { reducer, reportedErrors } from "./store";
import sagaErrorHandler from "./saga/error-handler";
import handleSagaErrors from "./saga/decorator";
import {store} from "@birdiecare/galette-core";

const {actions} = store;

const components = {
  ErrorWrapper,
  ErrorMessage,
}

const selectors = {
  reportedErrors,
}

export {
  components,
  middleware,
  reducer,
  selectors,
  sagaErrorHandler,
  handleSagaErrors,
  actions,
};
