import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store
} from "redux";
import reduxFold from "../lib/fold-middleware";
import { MainReducer } from "../reducers/main-reducer";

const syncReducers = {};

const combineAsyncReducers = (asyncReducers = {}) =>
  combineReducers({
    ...syncReducers,
    ...asyncReducers
  });

export type AsyncStore = Store<unknown, AnyAction> & {
  dispatch: unknown;
} & {
  asyncReducers: {
    [key: string]: Reducer<unknown, any>;
  };
  injectReducer: (key: string, reducer: Reducer<any>) => AsyncStore;
};

const initializeStore = (initialState = {}) => {
  const store = createStore(
    combineAsyncReducers(),
    initialState,
    applyMiddleware(reduxFold)
  ) as AsyncStore;
  store.asyncReducers = {};
  store.injectReducer = (key: string, reducer: Reducer<unknown, any>) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(combineAsyncReducers(store.asyncReducers) as any);
    return store;
  };

  return store;
};

type Reducers<T extends (...args: any) => any> = ReturnType<T>;

type AsyncReducers = Partial<{
  MainReducer: ReturnType<typeof MainReducer>;
}>;
export type GlobalState = ReturnType<Reducers<typeof combineAsyncReducers>> &
  AsyncReducers;

export default initializeStore;
