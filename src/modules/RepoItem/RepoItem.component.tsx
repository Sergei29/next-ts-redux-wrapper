import React, { memo } from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { RepoType } from "../../types";

type Props = {
  objRepo: RepoType;
};

const RepoItem = ({ objRepo }: Props) => {
  return (
    <Card sx={{ width: "300px" }}>
      <CardContent
        sx={{
          ":hover": {
            backgroundColor: (theme) => theme.bg.secondary,
            transition: "all 300ms ease-in-out",
          },
        }}
      >
        <Typography variant="h4" sx={{ fontSize: "18px", fontWeight: 600 }}>
          {objRepo.name}
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography variant="caption">
            Stars: {objRepo.stargazers_count}
          </Typography>
          <Typography variant="caption">
            Forks: {objRepo.forks_count}
          </Typography>
        </Box>
        <Typography variant="caption">
          Language: <Chip label={objRepo.language || "not mentioned"} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(RepoItem);
