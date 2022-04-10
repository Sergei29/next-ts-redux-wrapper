import axios from "axios";
import { ActionType, ThunkedActionCreator } from "../../../types";
import { GITHUB_API } from "../../../constants";
import { reposPayloadAdaptor, singleRepoAdaptor } from "../../../utils";
import { arrMockUserRepos } from "../../../mocks";

const getMockAsyncData = () =>
  new Promise<Record<string, any>[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(arrMockUserRepos);
    }, 600);
  });

export enum ActionName {
  GET_REPOS_START = "GET_REPOS_START",
  GET_REPOS_SUCCESS = "GET_REPOS_SUCCESS",
  GET_REPOS_ERROR = "GET_REPOS_ERROR",

  GET_REPO_DETAILS_START = "GET_REPO_DETAILS_START",
  GET_REPO_DETAILS_SUCCESS = "GET_REPO_DETAILS_SUCCESS",
  GET_REPO_DETAILS_ERROR = "GET_REPO_DETAILS_ERROR",
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
  (strUserName: string, bMockData = false): ThunkedActionCreator =>
  async (dispatch, getState) => {
    dispatch(actionGetUserReposStart());

    if (bMockData) {
      const mockData = await getMockAsyncData();
      dispatch(actionGetUserReposSuccess(reposPayloadAdaptor(mockData)));
      return;
    }

    try {
      const { data } = await axios.get<Record<string, any>[]>(
        `${GITHUB_API}/users/${strUserName}/repos`
      );
      dispatch(actionGetUserReposSuccess(reposPayloadAdaptor(data)));
    } catch (objError) {
      const strErrorMessage =
        (objError as Error).message || "Failed to fetch repos";
      dispatch(actionGetUserReposError(strErrorMessage));
    }
  };

const actionGetRepoDetailsStart = (): ActionType<undefined> => ({
  type: ActionName.GET_REPO_DETAILS_START,
});

const actionGetRepoDetailsError = (
  strErrorMessage: string
): ActionType<string> => ({
  type: ActionName.GET_REPO_DETAILS_ERROR,
  payload: strErrorMessage,
});

const actionGetRepoDetailsSuccess = (
  objSelectedRepo: Record<string, any>
): ActionType<Record<string, any>> => ({
  type: ActionName.GET_REPO_DETAILS_SUCCESS,
  payload: objSelectedRepo,
});

export const actionGetRepoDetails =
  (strRepoFullName: string): ThunkedActionCreator =>
  async (dispatch, getState) => {
    dispatch(actionGetRepoDetailsStart());
    const {
      repos: { arrRepos },
    } = getState();

    const objSelectedRepo =
      arrRepos.find((objRepo) => objRepo.full_name === strRepoFullName) || null;
    if (!!objSelectedRepo) {
      dispatch(actionGetRepoDetailsSuccess(objSelectedRepo));
      return;
    }

    try {
      const { data } = await axios.get<Record<string, any>>(
        `${GITHUB_API}/repos/${strRepoFullName}`
      );
      dispatch(actionGetRepoDetailsSuccess(singleRepoAdaptor(data)));
    } catch (objError) {
      const strErrorMessage =
        (objError as Error).message ||
        `Failed to fetch repo ${strRepoFullName}`;
      dispatch(actionGetRepoDetailsError(strErrorMessage));
    }
  };
