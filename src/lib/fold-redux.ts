import { AnyAction, Dispatch, Reducer } from "redux";
import { GlobalState } from "../redux/store";

export type ActionReduceProps = {
  dispatch: Dispatch<AnyAction>;
  globalState: GlobalState;
};

export abstract class ReduxAction<State> {
  public type: string;
  public reducer: Reducer<any, any>;
  public constructor(reducer: Reducer<any, any>) {
    this.reducer = reducer;
    this.type = this.constructor.name;
  }
  public abstract reduce(
    reducerState: State,
    props: ActionReduceProps
  ): State | Promise<State>;
}
