import { Reducer } from "react";
import { foldReducer } from "../lib/fold-redux";

const initialState = { number: 0 };

export type MainReducerState = typeof initialState;

export type MainReducerType = Reducer<MainReducerState, any>;

export const MainReducer = foldReducer<MainReducerState>(initialState);
