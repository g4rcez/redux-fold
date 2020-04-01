import { Middleware } from "redux";
import { ReduxAction } from "./fold-redux";

const reduxFold: Middleware = ({ getState, dispatch }) => next => (
  action: ReduxAction | Function | never
) => {
  if (action instanceof ReduxAction) {
    const reducerName = action.reducer.name;
    const globalState = getState();
    return Promise.resolve(
      action.reduce(globalState[reducerName], { dispatch, globalState })
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
