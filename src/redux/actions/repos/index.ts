import axios from "axios";
import { ActionType, ThunkedActionCreator } from "../../../types";
import { GITHUB_API } from "../../../constants";
import { reposPayloadAdaptor } from "../../../utils";
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

  GET_LANGUAGES_START = "GET_LANGUAGES_START",
  GET_LANGUAGES_SUCCESS = "GET_LANGUAGES_SUCCESS",
  GET_LANGUAGES_ERROR = "GET_LANGUAGES_ERROR",
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

const actionGetLanguagesStart = (): ActionType<undefined> => ({
  type: ActionName.GET_LANGUAGES_START,
});

const actionGetLanguagesError = (
  strErrorMessage: string
): ActionType<string> => ({
  type: ActionName.GET_LANGUAGES_ERROR,
  payload: strErrorMessage,
});

const actionGetLanguagesSuccess = (
  arrUpdatedReposList: Record<string, any>[]
): ActionType<Record<string, any>[]> => ({
  type: ActionName.GET_LANGUAGES_SUCCESS,
  payload: arrUpdatedReposList,
});

export const actionGetUserLanguages =
  (strLanguagesUrl: string, intUserId: number): ThunkedActionCreator =>
  async (dispatch, getState) => {
    dispatch(actionGetLanguagesStart());
    const {
      repos: { arrRepos },
    } = getState();
    try {
      const { data } = await axios.get<Record<string, any>>(strLanguagesUrl);
      const arrReposUpdated = arrRepos.map((repo) =>
        repo.id === intUserId ? { ...repo, languages: data } : repo
      );

      dispatch(actionGetLanguagesSuccess(arrReposUpdated));
    } catch (objError) {
      const strErrorMessage =
        (objError as Error).message || "Failed to fetch repos";
      dispatch(actionGetLanguagesError(strErrorMessage));
    }
  };
