import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

type Props = {
  bIsFavorite: boolean;
  handleClick: () => void;
};

export const FavoriteButton = ({
  bIsFavorite,
  handleClick,
}: Props): JSX.Element => (
  <IconButton onClick={handleClick} disabled={bIsFavorite}>
    <Tooltip title={bIsFavorite ? "this repo is favorite" : "add to favorites"}>
      {bIsFavorite ? <StarIcon /> : <StarBorderIcon />}
    </Tooltip>
  </IconButton>
);
