import { ReduxAction } from "../lib/fold-redux";
import { ActionReduceProps } from "../lib/fold-types";
import { MainReducer } from "../reducers/main-reducer";

export class ActionTest extends ReduxAction {
  public reduce(
    state: ReturnType<typeof MainReducer>,
    props: ActionReduceProps
  ) {
    if (this.number === 9) {
      setTimeout(() => {
        props.dispatch(new ActionTest(7));
      }, 5000);
    }
    return { ...state, number: this.number };
  }
  private number: number;
  public constructor(n: number) {
    super(MainReducer);
    this.number = n;
  }
}
