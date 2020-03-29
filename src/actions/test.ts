import { ActionReduceProps, ReduxAction } from "../lib/fold-redux";
import { MainReducer } from "../reducers/main-reducer";

type ActionTestType = { number: number };

export class ActionTest extends ReduxAction<ActionTestType> {
  private number: number;
  public constructor(n: number) {
    super(MainReducer);
    this.number = n;
  }
  public reduce(
    state: ActionTestType,
    props: ActionReduceProps
  ): ActionTestType {
    console.log(this.number);
    if (this.number === 9) {
      setTimeout(() => {
        props.dispatch(new ActionTest(7));
      }, 5000);
    }
    return { ...state, number: this.number };
  }

  public static dispatch(n: number) {
    return new ActionTest(n);
  }
}
