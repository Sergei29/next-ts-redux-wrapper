import { Reducer, AnyAction } from "redux";
import { ReposStateType } from "../../types";
import { ActionName } from "../actions/repos";

const {
  GET_REPOS_START,
  GET_REPOS_SUCCESS,
  GET_REPOS_ERROR,
  GET_REPO_DETAILS_START,
  GET_REPO_DETAILS_SUCCESS,
  GET_REPO_DETAILS_ERROR,
} = ActionName;

export const OBJ_INIT_STATE_REPOS: ReposStateType = {
  arrRepos: [],
  bLoading: false,
  nStrError: null,
  nObjSelectedRepo: null,
};

export const reducerRepos: Reducer<ReposStateType, AnyAction> = (
  objStateRepos = OBJ_INIT_STATE_REPOS,
  objAction
) => {
  switch (objAction.type) {
    case GET_REPOS_START:
    case GET_REPO_DETAILS_START:
      return { ...objStateRepos, nStrError: null, bLoading: true };
    case GET_REPOS_SUCCESS:
      return {
        ...objStateRepos,
        nStrError: null,
        bLoading: false,
        arrRepos: objAction.payload,
      };
    case GET_REPO_DETAILS_SUCCESS:
      return {
        ...objStateRepos,
        nStrError: null,
        bLoading: false,
        nObjSelectedRepo: objAction.payload,
      };
    case GET_REPOS_ERROR:
    case GET_REPO_DETAILS_ERROR:
      return {
        ...objStateRepos,
        bLoading: false,
        nStrError: objAction.payload,
      };
    default:
      return objStateRepos;
  }
};
