import { AnyAction, Dispatch, Reducer } from "redux";
import { GlobalState } from "../redux/store";

export interface IReduxAction<State> {
  type: string;
  reduce(
    state: State,
    props: {
      dispatch: Dispatch<AnyAction>;
      getState: () => GlobalState;
    }
  ): State | Promise<State>;
}

export abstract class ReduxAction<State> implements IReduxAction<State> {
  public type: string;
  public reducer: Reducer<any, any>;
  public constructor(reducer: Reducer<any, any>) {
    this.reducer = reducer;
    this.type = this.constructor.name;
  }
  public abstract reduce(
    state: State,
    props: { dispatch: Dispatch<AnyAction>; getState: () => GlobalState }
  ): State | Promise<State>;
}
