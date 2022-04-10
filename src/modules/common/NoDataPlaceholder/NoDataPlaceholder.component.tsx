import React from "react";
import { Box, Typography, CardMedia } from "@mui/material";

type Props = {
  strCustomMessage?: string;
};

const NoDataPlaceholder = ({ strCustomMessage }: Props) => (
  <Box
    sx={{
      minHeight: "30vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      rowGap: 2,
    }}
  >
    <Typography variant="h4" sx={{ color: (theme) => theme.text.main }}>
      {strCustomMessage || "Sorry, no data available"}
    </Typography>
    <CardMedia
      image="https://i.imgur.com/FOeYt4E.png"
      sx={{ height: "50vh", width: "40vw" }}
    />
  </Box>
);

export default NoDataPlaceholder;
