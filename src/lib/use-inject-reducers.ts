import { useEffect } from "react";
import { useStore } from "react-redux";
import { Reducer } from "redux";
import { AsyncStore } from "../redux/store";

const useInjectReducers = (...reducer: Reducer<any>[]) => {
  const store = useStore() as AsyncStore;

  useEffect(() => {
    store.injectReducers(...reducer);
  }, [reducer]);
};

export default useInjectReducers;
