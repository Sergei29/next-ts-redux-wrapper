import React from "react";
import { Box } from "@mui/material";
import { RepoType } from "../../types";
import RepoItem from "../RepoItem";

type Props = {
  arrFavorites: RepoType[];
  handleRemoveFavorite: (strFullname: string) => void;
};

const FavoritesList = ({ arrFavorites, handleRemoveFavorite }: Props) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 2,
      alignItems: "center",
    }}
  >
    {arrFavorites.map((objFavRepo) => (
      <RepoItem
        key={objFavRepo.id}
        objRepo={objFavRepo}
        handleRemoveFavorite={handleRemoveFavorite}
      />
    ))}
  </Box>
);

export default FavoritesList;
