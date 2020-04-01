import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActionTest } from "./actions/test";
import fillState from "./lib/fill-state";
import useInjectReducers from "./lib/use-inject-reducers";
import useReduxState from "./lib/use-redux-state";
import { MainReducer } from "./reducers/main-reducer";
import { GlobalState } from "./redux/store";

const getState = (state: GlobalState) =>
  fillState<typeof MainReducer>(state, MainReducer);

const App = () => {
  useInjectReducers(MainReducer);
  const dispatch = useDispatch();
  const state = useReduxState(getState);

  useEffect(() => {
    setTimeout(() => {
      dispatch(new ActionTest(9));
    }, 1000);
  }, [dispatch]);

  return <span>{JSON.stringify(state)}</span>;
};

export default App;
