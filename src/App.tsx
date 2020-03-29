import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActionTest } from "./actions/test";
import fillState from "./lib/fill-state";
import useInjectReducer from "./lib/use-inject-reducer";
import useReduxState from "./lib/use-redux-state";
import {
  MainReducer,
  mainReducerInitialReducer
} from "./reducers/main-reducer";

const App = () => {
  useInjectReducer("MainReducer", MainReducer);
  const dispatch = useDispatch();
  const state = useReduxState(state => {
    const MainReducer = fillState(state.MainReducer, mainReducerInitialReducer);
    return {
      n: MainReducer.number
    };
  });

  useEffect(() => {
    dispatch(new ActionTest(9));
  }, [dispatch]);

  return <span>{JSON.stringify(state)}</span>;
};

export default App;
