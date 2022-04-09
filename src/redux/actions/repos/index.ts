import axios from "axios";
import { ActionType, ThunkedActionCreator } from "../../../types";
import { GITHUB_API } from "../../../constants";

export enum ActionName {
  GET_REPOS_START = "GET_REPOS_START",
  GET_REPOS_SUCCESS = "GET_REPOS_SUCCESS",
  GET_REPOS_ERROR = "GET_REPOS_ERROR",
}

const actionGetUserReposStart = (): ActionType<undefined> => ({
  type: ActionName.GET_REPOS_START,
});

const actionGetUserReposError = (
  strErrorMessage: string
): ActionType<string> => ({
  type: ActionName.GET_REPOS_ERROR,
  payload: strErrorMessage,
});

const actionGetUserReposSuccess = (
  arrReposList: Record<string, any>[]
): ActionType<Record<string, any>[]> => ({
  type: ActionName.GET_REPOS_SUCCESS,
  payload: arrReposList,
});

export const actionGetUserRepos =
  (strUserName: string): ThunkedActionCreator =>
  async (dispatch, getState) => {
    dispatch(actionGetUserReposStart());
    try {
      const { data } = await axios.get<Record<string, any>[]>(
        `${GITHUB_API}/users/${strUserName}/repos`
      );
      dispatch(actionGetUserReposSuccess(data));
    } catch (objError) {
      const strErrorMessage =
        (objError as Error).message || "Failed to fetch repos";
      dispatch(actionGetUserReposError(strErrorMessage));
    }
  };
