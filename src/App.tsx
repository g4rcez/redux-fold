import React, { useEffect } from "react";
import { ActionTest } from "./actions/test";
import fillState from "./lib/fill-state";
import useRedux from "./lib/use-connect";
import useInjectReducer from "./lib/use-inject-reducer";
import {
  MainReducer,
  mainReducerInitialReducer
} from "./reducers/main-reducer";

const actions = { ActionTest: ActionTest.dispatch };

const App = () => {
  useInjectReducer("MainReducer", MainReducer);
  const [state, dispatch] = useRedux(state => {
    const MainReducer = fillState(state.MainReducer, mainReducerInitialReducer);
    return {
      n: MainReducer.number
    };
  }, actions);

  useEffect(() => {
    setTimeout(() => dispatch.ActionTest(9), 3000);
  }, [dispatch]);

  return <span>{JSON.stringify(state)}</span>;
};

export default App;
