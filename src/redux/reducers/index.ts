import { combineReducers, Reducer, AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { reducerRepos, OBJ_INIT_STATE_REPOS } from "./repos";
import { RootStateType } from "../../types";

export const OBJ_INIT_STATE: RootStateType = {
  repos: OBJ_INIT_STATE_REPOS,
};

const combinedReducer = combineReducers<RootStateType>({
  repos: reducerRepos,
});

export const rootReducer: Reducer<RootStateType, AnyAction> = (
  objRootState,
  objAction
) => {
  if (objAction.type === HYDRATE) {
    const objNextState = {
      ...objRootState,
      ...objAction.payload,
    };
    if (objRootState?.repos.arrRepos)
      objNextState.repos.arrRepos = objRootState?.repos.arrRepos;
    if (objRootState?.repos.nObjSelectedRepo) {
      objNextState.repos.nObjSelectedRepo =
        objRootState?.repos.nObjSelectedRepo;
    }
    return objNextState;
  } else {
    return combinedReducer(objRootState, objAction);
  }
};
