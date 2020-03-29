import { useEffect } from "react";
import { useStore } from "react-redux";
import { Reducer } from "redux";
import { AsyncStore } from "../redux/store";

const useInjectReducer = (key: string, reducer: Reducer<any>) => {
  const store = useStore() as AsyncStore;

  useEffect(() => {
    store.injectReducer(key, reducer);
  }, []);
};

export default useInjectReducer;
