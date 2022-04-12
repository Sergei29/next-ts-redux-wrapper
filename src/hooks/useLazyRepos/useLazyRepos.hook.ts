import { useDispatch, useSelector } from "react-redux";
import { actionGetUserRepos } from "../../redux/actions/repos";
import { RootStateType, ReposStateType } from "../../types";

type HookReturnType = [(strSearchTerm: string) => void, ReposStateType];

export const useLazyRepos = (): HookReturnType => {
  const dispatch = useDispatch();
  const { arrRepos, bLoading, nStrError, nObjSelectedRepo } = useSelector<
    RootStateType,
    ReposStateType
  >((state) => state.repos);

  const handleFetchRepos = (strSearchTerm: string) => {
    dispatch(actionGetUserRepos(strSearchTerm));
  };

  return [
    handleFetchRepos,
    { arrRepos, bLoading, nStrError, nObjSelectedRepo },
  ];
};
