import { useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { GlobalState } from "../redux/store";

type Selector<T> = (_: GlobalState) => T;
export type Dispatch<T> = { readonly [P in keyof T]: T[P] };

const getState = <T>(fn: Selector<T>) =>
  createSelector(
    (_: GlobalState) => fn(_),
    s => s
  );

type Action = { readonly [key: string]: any };

type Actions<S> = { [key in keyof S]: (...args: any) => Action };

const useRedux = <T, S extends Actions<S>>(
  state: Selector<T>,
  dispatches: Dispatch<S>,
  cmp = shallowEqual
): [T, Dispatch<S>] => {
  const dispatch = useDispatch();
  const memoDispatch = useMemo(
    () =>
      Object.entries(dispatches).reduce(
        (acc, [name, fn]: [string, any]) => ({
          ...acc,
          [name]: (...params: any) => dispatch(fn(...params))
        }),
        {}
      ) as Dispatch<S>,
    []
  );
  return [useSelector(getState(state), cmp), memoDispatch];
};

export default useRedux;
