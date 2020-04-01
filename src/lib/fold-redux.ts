import { AnyAction, Reducer } from "redux";
import { ActionReduceProps } from "./fold-types";

export abstract class ReduxAction {
  public type: string;
  public reducer: Reducer;
  public constructor(reducer: Reducer) {
    this.reducer = reducer;
    this.type = this.constructor.name;
  }
  public abstract reduce(
    reducerState: ReturnType<Reducer<unknown, any>>,
    props: ActionReduceProps
  ): ReturnType<Reducer> | Promise<ReturnType<Reducer>>;
}

export const foldReducer = <State>(
  initialState: State
): Reducer<State, any> => (
  state: State = initialState,
  { type, ...actions }: AnyAction
) => ({
  ...state,
  ...actions
});
