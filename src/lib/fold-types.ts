import { Dispatch, Reducer, AnyAction } from "redux";
import { ReduxAction } from "./fold-redux";
import { GlobalState } from "../redux/store";

export type Reducers<T> = {
  [key in keyof T]: Reducer;
};

export type Fn = (...a: any) => any;
export type FoldAction<T extends Fn> = ReduxAction<T> | Function | never;

export type ActionReduceProps = {
  dispatch: Dispatch<AnyAction>;
  globalState: GlobalState;
};
