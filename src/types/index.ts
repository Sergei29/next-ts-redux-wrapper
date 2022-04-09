import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export type RepoType = Record<string, any>;

export type ReposStateType = {
  arrRepos: RepoType[];
  bLoading: boolean;
  nStrError: null | string;
};

export type RootStateType = {
  repos: ReposStateType;
};

export type ActionType<T> = AnyAction & {
  payload?: T;
};

export type ThunkedActionCreator = ThunkAction<any, RootStateType, any, any>;
