export const mainReducerInitialReducer = { number: 0 };

export type MainReducerState = typeof mainReducerInitialReducer;
export const MainReducer = (
  state = mainReducerInitialReducer,
  { type, ...rest }: any
): MainReducerState => (type === MainReducer.name ? { ...state, ...rest } : state);
