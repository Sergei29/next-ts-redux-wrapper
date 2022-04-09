import {
  createStore,
  applyMiddleware,
  Store as ReduxStore,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../reducers";

const bIsDevelopment = process.env.NODE_ENV === "development";

const arrMiddlewares = [thunk];

const compoundMiddlewares = bIsDevelopment
  ? composeWithDevTools(applyMiddleware(...arrMiddlewares))
  : applyMiddleware(...arrMiddlewares);

const store = createStore(rootReducer, compose(compoundMiddlewares));

export const initStore = (): ReduxStore => store;

export const wrapper = createWrapper(initStore);
