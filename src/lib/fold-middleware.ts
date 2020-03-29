import { Middleware } from "redux";
import { ReduxAction } from "./fold-redux";

const reduxFold: Middleware = ({ getState, dispatch }) => next => <T>(
  action: ReduxAction<T> | Function | never
) => {
  if (action instanceof ReduxAction) {
    const reducerName = action.reducer.name;
    return Promise.resolve(
      action.reduce(getState()[reducerName], { dispatch, getState })
    ).then((actionType: any) => {
      actionType.type = reducerName;
      next(actionType);
    });
  }
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  return next(action);
};

export default reduxFold;
