import { useLocalStorage } from "../useLocalStorage";
import { RepoType } from "../../types";

export const useFavorites = () => {
  const [arrFavorites, setArrFavorites] = useLocalStorage<RepoType[]>(
    "arrFavoriteRepos",
    []
  );

  const isFavorite = (strRepoFullName: string) =>
    !!arrFavorites &&
    arrFavorites.findIndex((objRepo) => objRepo.full_name === strRepoFullName) >
      -1;

  const handleRetrieveFavorite = (strRepoFullName: string) =>
    (!!arrFavorites &&
      arrFavorites.find((objRepo) => objRepo.full_name === strRepoFullName)) ||
    null;

  const handleAddFavorite = (objRepo: RepoType) => {
    const bAlreadyFavorite = isFavorite(objRepo.full_name);
    if (bAlreadyFavorite) return;
    setArrFavorites([...(arrFavorites || []), objRepo]);
  };

  const handleRemoveFavorite = (strRepoFullName: string) => {
    if (!arrFavorites) return;
    const arrNewFavorites = arrFavorites.filter(
      (objRepo) => objRepo.full_name !== strRepoFullName
    );
    setArrFavorites(arrNewFavorites);
  };

  return {
    arrFavorites,
    handleAddFavorite,
    handleRemoveFavorite,
    handleRetrieveFavorite,
    isFavorite,
  };
};
