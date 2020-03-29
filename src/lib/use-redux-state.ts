import { shallowEqual, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { GlobalState } from "../redux/store";

type Selector<T> = (_: GlobalState) => T;

const getState = <T>(fn: Selector<T>) =>
  createSelector(
    (_: GlobalState) => fn(_),
    s => s
  );

const useReduxState = <T>(state: Selector<T>, cmp = shallowEqual): T =>
  useSelector(getState(state), cmp);

export default useReduxState;
