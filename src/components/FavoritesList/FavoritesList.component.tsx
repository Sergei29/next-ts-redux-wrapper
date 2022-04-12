import React from "react";
import { Box } from "@mui/material";
import { RepoType } from "../../types";
import { RepoItem } from "../RepoItem";
import { NoDataPlaceholder } from "../common/NoDataPlaceholder";

type Props = {
  arrFavorites: RepoType[];
  handleRemoveFavorite: (strFullname: string) => void;
};

export const FavoritesList = ({
  arrFavorites,
  handleRemoveFavorite,
}: Props) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 2,
      alignItems: "center",
    }}
  >
    {arrFavorites.length > 0 ? (
      arrFavorites.map((objFavRepo) => (
        <RepoItem
          key={objFavRepo.id}
          objRepo={objFavRepo}
          handleRemoveFavorite={handleRemoveFavorite}
        />
      ))
    ) : (
      <NoDataPlaceholder />
    )}
  </Box>
);
