import { Middleware } from "redux";
import { ReduxAction } from "./fold-redux";

const reduxFold: Middleware = ({ getState, dispatch }) => next => <T>(
  action: ReduxAction<T> | Function | never
) => {
  if (action instanceof ReduxAction) {
    console.log({ action });
    const reducerName = action.reducer.name;
    const globalState = getState();
    return Promise.resolve(
      action.reduce(globalState[reducerName], { dispatch, globalState })
    ).then((actionType: any) => {
      console.log("LAST", { actionType });
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
