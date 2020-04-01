import { Reducer } from "redux";
import { GlobalState } from "../redux/store";
import { Fn } from "./fold-types";

const fillState = <T extends Fn>(
  globalState: GlobalState,
  reducer: Reducer
): ReturnType<T> => {
  const a = (globalState as any)[reducer.name];
  if (a === undefined) {
    return reducer(undefined, { type: "" });
  }
  return (globalState as any)[reducer.name];
};

export default fillState;
