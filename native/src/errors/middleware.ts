import { reportError } from "./actions";

const middleware = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    next(reportError(err, action))

    throw err
  }
}
