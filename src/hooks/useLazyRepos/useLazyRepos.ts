import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetUserRepos } from "../../redux/actions/repos";
import { RootStateType, ReposStateType } from "../../types";

const useLazyRepos = (): [(strSearchTerm: string) => void, ReposStateType] => {
  const dispatch = useDispatch();
  const { arrRepos, bLoading, nStrError } = useSelector<
    RootStateType,
    ReposStateType
  >((state) => state.repos);

  const handleFetchRepos = (strSearchTerm: string) => {
    dispatch(actionGetUserRepos(strSearchTerm));
  };

  return [handleFetchRepos, { arrRepos, bLoading, nStrError }];
};

export default useLazyRepos;
