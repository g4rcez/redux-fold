const fillState = <T>(reducer: T | undefined, placeholder = {} as T): T =>
  reducer === undefined ? placeholder : reducer;

export default fillState;
