import { Reducer, AnyAction } from "redux";
import { ReposStateType } from "../../types";
import { ActionName } from "../actions/repos";

const { GET_REPOS_START, GET_REPOS_SUCCESS, GET_REPOS_ERROR } = ActionName;

export const OBJ_INIT_STATE_REPOS: ReposStateType = {
  arrRepos: [],
  bLoading: false,
  nStrError: null,
};

export const reducerRepos: Reducer<ReposStateType, AnyAction> = (
  objStateRepos = OBJ_INIT_STATE_REPOS,
  objAction
) => {
  switch (objAction.type) {
    case GET_REPOS_START:
      return { ...objStateRepos, nStrError: null, bLoading: true };
    case GET_REPOS_SUCCESS:
      return {
        ...objStateRepos,
        nStrError: null,
        bLoading: false,
        arrRepos: objAction.payload,
      };
    case GET_REPOS_ERROR:
      return {
        ...objStateRepos,
        bLoading: false,
        nStrError: objAction.payload,
      };
    default:
      return objStateRepos;
  }
};
