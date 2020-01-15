import { store } from "@birdiecare/galette-core";
const {actions} = store;

const middleware = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    next(actions.reportError(err, action))

    throw err
  }
}

export default middleware;
